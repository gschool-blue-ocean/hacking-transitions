import { useEffect, useState, useRef } from "react";
import { MdSend, MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import io from "socket.io-client";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import { server } from "../../utility";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import styles from "../../styles/Chat.module.css";
const Chat = () => {
  const { userData, activeStudent, cohortChat } = useSelector(
    ({ app: { currentUser, activeStudent, cohortChat } }) => ({
      userData: currentUser,
      activeStudent,
      cohortChat,
    })
  );

  let newSocket;
  const [editInfo, setEditInfo] = useState(null);
  const [chatMessages, setChatMessages] = useState([]); //Chat messages to display
  const [socket, setSocket] = useState({}); // socket connection
  const [newMessage, setNewMessage] = useState("");
  const [ctrlDown, setCtrlDown] = useState(false);
  const [display, setDisplay] = useState({
    dots: false,
    editBtns: false,
  });

  useEffect(() => {
    (async () => {
      await fetch(`${server}/api/socket`);
      newSocket = io();
      setSocket(newSocket);

      let comments;

      !newSocket.connected &&
        newSocket.on("connect", () => {
          console.log("connected");
        });

      if (userData.admin && cohortChat[0]) {
        comments = await getCohortComments(cohortChat[0].cohort_id);
        // if put in a function will break and resend the message
        newSocket.emit("admin_cohort_room", [
          cohortChat[0].cohort_id,
          userData.user_id,
        ]);
      } else {
        comments = await getStudentComments(
          userData.user_id /*activeStudent.user_id*/
        );
        userData.admin
          ? newSocket.emit("join_room", 9 /*activeStudent.user_id*/)
          : newSocket.emit("join_room", userData.user_id);
      }
      setChatMessages(comments);

      newSocket.on("recieve_message", (newMessage) => {
        console.log("message recieved", newMessage.content);
        setChatMessages((oldMsgs) => [...oldMsgs, newMessage]);
      });
      newSocket.on("edit_message", async (newMessage) => {
        console.log("edit message recieved", newMessage);
        const comments =
          userData.admin && cohortChat[0]
            ? await getCohortComments(cohortChat[0].cohort_id)
            : await getStudentComments(
                userData.user_id /*activeStudent.user_id*/
              );
        setChatMessages(comments);
      });
    })();
  }, [cohortChat]);

  const submitMsg = async () => {
    try {
      const foundContent = /<[a-z]+> ( (\s|\W)* (\w|\d)+ (\s|\W)* )+ <\/[a-z]+>/g; //need to fix not picking up periods
      if (!foundContent.test(newMessage)) return; // If newMeessage is empty dont send
      // Create a new comment object
      const newMessageObj = {
        student_id: activeStudent.user_id,
        author_id: userData.user_id,
        author_name: `${userData.first} ${userData.last}`,
        content: newMessage,
        date_time: editInfo
          ? editInfo.date_time
          : new Date(Date.now()).toUTCString(),
      };
      if (cohortChat[0]) newMessageObj.cohort_id = cohortChat[0].cohort_id;
      if (editInfo)
        (newMessageObj.index = editInfo.index),
          !cohortChat[0] && (newMessageObj.comment_id = editInfo.id);
      // Update chat display with newly typed message
      editInfo
        ? setChatMessages((oldMsgs) => {
            const newChat = oldMsgs;
            newChat[editInfo.index] = newMessageObj;
            return newChat;
          })
        : setChatMessages((oldMsgs) => [...oldMsgs, newMessageObj]);

      // send the new message to the server
      console.log(editInfo);

      editInfo !== null
        ? cohortChat[0]
          ? await socket.emit(
              "edit_cohort_message",
              newMessageObj,
              editInfo.id,
              cohortChat
            )
          : await socket.emit("edit_message", newMessageObj, editInfo.id)
        : cohortChat[0]
        ? await socket.emit("send_cohort_message", newMessageObj, cohortChat)
        : await socket.emit("send_new_message", newMessageObj);

      //reset input field
      setEditInfo(null);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {/* CREATE EXISTING MESSAGES */}
      <div className={styles.display}>
        {chatMessages.map(
          (
            {
              author_id,
              author_name,
              comment_id,
              content,
              date_time,
              student_id,
              cohort_id,
            },
            index
          ) => {
            return (
              <div
                className={`${styles.message} ${
                  author_id === userData.user_id && styles.right
                }`}
              >
                <button>...</button>
                <div>
                  <button
                    onClick={() => {
                      setNewMessage(content);
                      setEditInfo({
                        id: cohortChat[0] ? cohort_id : comment_id,
                        index,
                        date_time,
                      });
                    }}
                  >
                    <MdOutlineModeEdit />
                  </button>
                  <button
                    onClick={() => {
                      setChatMessages((oldMsgs) => {
                        const newChat = oldMsgs;
                        newChat.splice(index, 1);
                        return newChat;
                      });

                      !cohortChat[0]
                        ? socket.emit("edit_message", null, comment_id, true)
                        : socket.emit(
                            "edit_cohort_message",
                            { author_id, date_time },
                            cohort_id,
                            cohortChat,
                            true
                          );
                    }}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
                <div className={styles.body}>
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                  <p className={styles.time}>
                    {" "}
                    <i>{date_time}</i>
                  </p>
                </div>
                <strong className={` ${styles.name}`}>{author_name}</strong>
              </div>
            );
          }
        )}
      </div>
      {/* END CREATE EXISTING MESSAGES */}
      {/* CREATE A NEW  MESSAGE */}
      <div className={styles.newMsgWrapper}>
        <QuillNoSSRWrapper
          style={{
            height: "100%",
            maxHeight: "100%",
            width: "100%",
            maxWidth: "100%",
          }}
          theme="snow"
          onChange={setNewMessage}
          value={newMessage}
          onKeyDown={({ key }) => {
            key === "Control" && setCtrlDown(true);
          }}
          onKeyUp={({ key }) => {
            key === "Control" && setCtrlDown(false);
            key === "Enter" && ctrlDown && submitMsg();
          }}
        />
        <button
          tabIndex={1}
          className={styles.submit}
          onClick={() => submitMsg()}
        >
          <MdSend />
        </button>
      </div>

      {/*END CREATE A NEW  MESSAGE */}
    </div>
  );
};

export default Chat;

const getCohortComments = async (id) =>
  await (await fetch(`${server}/api/comments/cohort/${id}`)).json();

const getStudentComments = async (id) =>
  await (await fetch(`${server}/api/comments/student/${id}`)).json();
