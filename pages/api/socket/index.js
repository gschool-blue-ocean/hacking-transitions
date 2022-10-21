import { Server } from "socket.io";
import sql from "../../../database/connection";

const updateDB = async (msg, id, del = false) => {
  let res;
  id
    ? del
      ? (res =
          await sql`DELETE FROM comments WHERE comment_id = ${id} RETURNING *`)
      : (res = await sql`UPDATE comments SET ${sql(
          msg
        )} WHERE comment_id = ${id} RETURNING *`)
    : (res = await sql`INSERT INTO comments ${sql(msg)} RETURNING *`);
  console.log(
    `${id ? (del ? "deleted message" : "updated message") : "created message"}`,
    res
  );
  return res[0].comment_id;
};

export default async function handler(req, res) {
  console.log(req.method, req.url);
  /******* ESTABLISH SOCKET CONNECTION ALLOWING CHAT *******/
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.removeAllListeners();
      console.log(`User Connected`);

      ///// JOIN A SPECIFIC STUDNETS CHAT ROOM
      socket.on("join_room", (id) => {
        socket.join(id);

        console.log("joined Room#", id);
      });

      socket.on("admin_cohort_room", (ids) => {
        const [cohortId, adminId] = [...ids];
        socket.join(`C${cohortId}`);
        console.log(`admin ${adminId} joined cohort room C${cohortId}`);
      });
      /***** HANDLE WHEN A NEW MESSAGE IS SENT *****/

      socket.on("edit_message", async (msg, id, del = false) => {
        console.log("recieved edit message", msg, id);

        msg.comment_id = await updateDB(msg, id, del);
        socket.to(msg.student_id).emit("edit_message", msg, del);
      });

      socket.on(
        "edit_cohort_message",
        async (msg, id, students, del = false) => {
          console.log("received cohort edit message", msg, id);

          msg.comment_id = await updateDB(msg, id, del);
          let groupSocket = socket;

          for (const { user_id } of students) {
            msg.student_id = user_id;
            groupSocket = groupSocket.to(user_id);
          }
          groupSocket.emit(
            "edit_message",
            del ? { delete: true, index: msg.index } : msg
          );
        }
      );

      socket.on("send_new_message", async (msg) => {
        console.log("received new message", msg);

        ///// Create a new message in the database
        msg.comment_id = await updateDB(msg);
        ///// Broadcast the new message to be received by all clients connected except the sender
        socket.to(msg.student_id).emit("recieve_message", msg);
      });

      socket.on("send_cohort_message", async (msg, students) => {
        console.log(
          `received new message for cohort ${students[0].cohort_id}`,
          msg
        );
        let groupSocket = socket;
        msg.student_id = null;
        msg.comment_id = await updateDB(msg);
        for (const { user_id } of students) {
          msg.student_id = user_id;
          groupSocket = groupSocket.to(user_id);
        }
        groupSocket.emit("recieve_message", msg);
      });
      /***** END HANDLE WHEN A NEW MESSAGE IS SENT *****/

      socket.on("disconnect", (reason) =>
        console.log("User Disconnected because of", reason)
      );
    });
    /******* END ESTABLISH SOCKET CONNECTION ALLOWING CHAT *******/
  }

  res.end();
}
