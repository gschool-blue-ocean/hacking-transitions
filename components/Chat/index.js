import { useEffect, useState, useRef } from "react";
import { server } from "../../utility";
import io from "socket.io-client";
import { MdSend } from "react-icons/md";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/Chat.module.css";
const Chat = () => {
  const testUser = 11;
  // user_data localstorage? redux?
  const userData = {
    user_id: testUser,
    firstName: "BlueOcean",
    lastName: "BlueOcean",
  };
  const [chatMessages, setChatMessages] = useState([]); //Chat messages to display
  const [socket, setSocket] = useState({}); // socket connection
  const [newMessage, setNewMessage] = useState("");
  const [ctrlDown, setCtrlDown] = useState(false);

  useEffect(() => {
    (async () => {
      /******** CONNECT TO SOCKET/CHAT SERVER ********/
      await fetch(`${server}/api/socket`);
      setSocket(io());
      /******** END CONNECT TO SOCKET/CHAT SERVER ********/

      /******** GET ALL COMMENTS RELATED TO SPECIFIC STUDENT ********/
      const studentComments = await (
        await fetch(`${server}/api/comments/student/${testUser}`)
      ).json();
      // console.log(studentComments);
      setChatMessages(studentComments);
      /******** END GET ALL COMMENTS RELATED TO SPECIFIC STUDENT ********/
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (socket.on) {
        socket.on("connect", () => {
          console.log("connected");
        });
        await joinRoom(); //join room by students id
        ////If not sender of message recieve the new message and display it
        socket.on("recieve_message", (newMessage) => {
          setChatMessages((oldMsgs) => [...oldMsgs, newMessage]);
        });
      }
    })();
  }, [socket]);

  const submitMsg = async () => {
    const foundContent = /(<[a-z]+>(\s*?(\w+|\d+)\s*?)+<\/[a-z]+>)/g
    if (!foundContent.test(newMessage)) return; // If newMeessage is empty dont send
    // Create a new comment object
    const newMessageObj = {
      student_id: testUser,
      author_id: userData.user_id,
      author_name: `${userData.firstName} ${userData.lastName}`,
      content: newMessage,
      date_time: new Date(Date.now()).toUTCString(),
    };
    // Update chat display with newly typed message
    setChatMessages((oldMsgs) => [...oldMsgs, newMessageObj]);
    console.log(foundContent.test(newMessageObj));

    // send the new message to the server
    if (socket.connected) {
      await socket.emit("send_new_message", newMessageObj);
    }
    //reset input field
    setNewMessage("");
  };
  const joinRoom = async () => {
    // JSON.parse(localStorage.currentUser).admin || userData.admin
    //   ? await socket.emit("join_room", 11 /*activeStudent.user_id*/)
    //   : await socket.emit("join_room", userData.user_id);
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
        <button tabIndex={1}className={styles.submit} onClick={() => submitMsg()}>
          <MdSend />
        </button>
      </div>

      {/*END CREATE A NEW  MESSAGE */}
    </div>
  );
};

export default Chat;
