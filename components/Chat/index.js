import { useEffect, useState, useRef } from "react";
import { MdSend } from "react-icons/md";
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

  // user_data localstorage? redux?
  let newSocket;
  const [chatMessages, setChatMessages] = useState([]); //Chat messages to display
  const [socket, setSocket] = useState({}); // socket connection
  const [newMessage, setNewMessage] = useState("");
  const [ctrlDown, setCtrlDown] = useState(false);

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
       
        
        comments = await (
          await fetch(
            `${server}/api/comments/cohort/${cohortChat[0].cohort_id}`
          )
        ).json();
console.log(comments,'cohort commenst');

        // if put in a function will break and resend the message
        newSocket.emit("admin_cohort_room", [
          cohortChat[0].cohort_id,
          userData.user_id,
        ]);
      } else {
        ;
        userData.admin
          ? newSocket.emit("join_room", 9 /*activeStudent.user_id*/)
          : newSocket.emit("join_room", userData.user_id);

        comments = await (
          await fetch(
            `${server}/api/comments/student/${userData.user_id /*activeStudent.user_id*/}`
          )
        ).json();
      }
      setChatMessages(comments);

      newSocket.on("recieve_message", (newMessage) => {
        console.log("message recieved", newMessage.content);
        setChatMessages((oldMsgs) => [...oldMsgs, newMessage]);
      });
    })();
  }, [cohortChat]);

  const submitMsg = async () => {
    try {
      const foundContent = /(<[a-z]+>(\s*?(\w+|\d+)\s*?)+<\/[a-z]+>)/g;
      if (!foundContent.test(newMessage)) return; // If newMeessage is empty dont send
      // Create a new comment object
      const newMessageObj = {
        student_id: 9, //activeStudent.user_id,
        author_id: userData.user_id,
        author_name: `${userData.first} ${userData.last}`,
        content: newMessage,
        date_time: new Date(Date.now()).toUTCString(),
      };
      if (cohortChat[0]) newMessageObj.cohort_id = cohortChat[0].cohort_id;
      // Update chat display with newly typed message
      console.log(newMessageObj);

      // setting state here causes this to render twice i think and, makes client recieve multiple of the same message
      setChatMessages((oldMsgs) => [...oldMsgs, newMessageObj]);

      // send the new message to the server
      cohortChat[0]
        ? await socket.emit("send_cohort_message", newMessageObj, cohortChat)
        : await socket.emit("send_new_message", newMessageObj);

      //reset input field
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container} on>
      {/* CREATE EXISTING MESSAGES */}
      <div className={styles.display}>
        {chatMessages.map(
          ({
            author_id,
            author_name,
            comment_id,
            content,
            date_time,
            student_id,
          }) => {
            return (
              <div
                key={comment_id}
                className={`${styles.message} ${
                  author_id === userData.user_id && styles.right
                }`}
              >
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
