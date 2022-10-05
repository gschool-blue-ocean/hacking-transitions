import React from "react";
import styles from "../../styles/StudentPage.module.css";

// Pull  Selected Task Info from DB
export default function SPTaskModal({ task, closeModal }) {
   const deleteTask = (taskID) => {
      fetch(`https://hacking-transition.herokuapp.com/api/delete/task/${taskID}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });
   };

   if (task) {
      return (
         <div className={styles.SPTask-Modal}>
            <h3 id="Modal-Header">{task.title}</h3>

            <div className={styles.ModalTaskStatus}>
               <h4>Status</h4>
               <p>{task.completed ? "Completed" : "In Progress"}</p>
            </div>

            <div className={styles.ModalTaskDesc}>
               <p>{task.date}</p>
               <h4>Description</h4>
               <p>{task.description}</p>
            </div>

            <button
               className={styles.ModalTaskBtns}
               onClick={() => {
                  deleteTask(task.task_id);
                  closeModal(false);
               }}
            >
               Delete
            </button>
         </div>
      );
   }
}