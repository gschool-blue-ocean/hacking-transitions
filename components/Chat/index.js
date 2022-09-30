import { useEffect, useState } from "react";
import { server } from "../../utility";
import io from "socket.io-client";
import styles from "../../styles/Chat.module.css";
const Chat = () => {
  // user_data localstorage? redux?
  const userData = { user_id: 11 };
  const [chatMessages, setChatMessages] = useState([]); //Chat messages to display
  const [message, setMessage] = useState(""); //new message 
  const [socket, setSocket] = useState({}); // socket connection
  useEffect(() => {
    (async () => {
      /******** CONNECT TO SOCKET/CHAT SERVER ********/
      await fetch(`${server}/api/socket`);
      setSocket(io());
      /******** END CONNECT TO SOCKET/CHAT SERVER ********/

      /******** GET ALL COMMENTS RELATED TO SPECIFIC STUDENT ********/
      const studentComments = await (
        await fetch(`${server}/api/comments/student/${11}`)
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
    if (message.length === 0) return; // If message is empty dont send
    // Create a new comment object
    const newMessage = {
      student_id: 11,
      author_id: userData.user_id,
      author_name: `${userData.first} ${userData.last}`,
      content: message,
      date_time: new Date(Date.now()).toUTCString(),
    };
    // Update chat display with newly typed message
    setChatMessages((oldMsgs) => [...oldMsgs, newMessage]);
    // send the new message to the server 
    socket.broadcast &&
      (await socket.broadcast
        .to(
          JSON.parse(localStorage.currentUser).admin || userData.admin
            ? 11 /*activeStudent.user_id*/
            : userData.user_id
        )
        .emit("send_new_message", newMessage));
    //reset input field
    setMessage("");
  };
  const joinRoom = async () => {
    JSON.parse(localStorage.currentUser).admin || userData.admin
      ? await socket.emit("join_room", 11 /*activeStudent.user_id*/)
      : await socket.emit("join_room", userData.user_id);
  };
  return (
    <div className={styles.container}>
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
                  author_id === userData.user_id ? styles.right : styles.left
                }`}
              >
                <p className={styles.content}> {content} </p>
                <div className={styles.head}>
                  {" "}
                  <strong>{author_name}</strong> <i>{date_time}</i>
                </div>
              </div>
            );
          }
        )}
      </div>
      {/* END CREATE EXISTING MESSAGES */}
      {/* CREATE A NEW  MESSAGE */}
      <div className={styles.newMsgWrapper}>
        <input
          type={"text"}
          autoComplete={"off"}
          name="newMsg"
          id="newMsg"
          placeholder="Type your message here"
          value={message}
          onChange={({ target }) => {
            setMessage(target.value);
          }}
          onKeyPress={({ key }) => {
            key === "Enter" && submitMsg();
          }}
        ></input>
        <button
          onClick={() => {
            submitMsg();
          }}
        ></button>
      </div>
      {/*END CREATE A NEW  MESSAGE */}
    </div>
  );
};

export default Chat;
