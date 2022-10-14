import React from "react";
import styles from "../../styles/StudentPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentTask } from '../../redux/features/app-slice';
import { server } from "../../utility";

// Pull  Selected Task Info from DB
export default function SPTaskModal({ task, closeModal }) {
   const dispatch = useDispatch();
   const deleteTask = (task) => {
      dispatch(deleteStudentTask(task));
      fetch(`${server}/api/tasks/${task.task_id}`, {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });
   };

   if (task) {
      return (
         <div className={styles.SPTaskModal}>
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
                  deleteTask(task);
                  closeModal(false);
               }}
            >
               Delete
            </button>
         </div>
      );
   }
}
