import { Server } from "socket.io";
import { server } from "../../../utility";
export default async function handler(req, res) {
  /******* ESTABLISH SOCKET CONNECTION ALLOWING CHAT *******/
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`User Connected`);

      ///// JOIN A SPECIFIC STUDNETS CHAT ROOM
      socket.on("join_room", (id) => {
        socket.join(id);
        console.log("joined Room#", id);
      });

      /***** HANDLE WHEN A NEW MESSAGE IS SENT *****/
      socket.on("send_new_message", (msg) => {
        ///// Create a new message in the database   
        fetch(`${server}/api/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(msg),
        });
        ///// Broadcast the new message to be recieved by all clients connected
        socket.to(msg.student_id).broadcast.emit("recieve_message", msg);
        /***** END HANDLE WHEN A NEW MESSAGE IS SENT *****/
      });

      socket.on("disconnect", () => console.log("User Disconnected"));
    });
    /******* END ESTABLISH SOCKET CONNECTION ALLOWING CHAT *******/
  }

  res.end();
}
