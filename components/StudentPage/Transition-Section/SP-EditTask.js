import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../../styles/StudentPage.module.css";
import axios from "axios";

export default function SPEditTask({ task, cancelEdit, closeModal }) {
   const { register, handleSubmit } = useForm();

//////////// PATCH request for edit tasks modal refactored to use axios ///////////

const editTask = async (edit, task) => {
   const taskID = task.task_id;
   const editData = {
       title: edit.title,
       date: convertDateToIso(edit.date),
       description: edit.description,
       completed: JSON.parse(edit.completed),
       remarks: null, // Remarks have been deleted
   };
   try {
       await axios.patch(`/api/tasks/${taskID}`, editData, {
           headers: { "Content-Type": "application/json" },
       });
   } catch (err) {
       console.log(err);
   }
   cancelEdit(false);
   closeModal(false);
};

   function convertDateToIso(date) {
      if (date.split("-")[0].length === 4) {
         return date;
      } else if (date.split("/")[0].length === 4) {
         return date;
      } else {
         let newDate = new Date(date);
         let dateArray = newDate.toLocaleDateString().split("/");
         let year = dateArray[2];
         let day = dateArray[1].length === 2 ? dateArray[1] : `0${dateArray[1]}`;
         let month = dateArray[0].length === 2 ? dateArray[0] : `0${dateArray[0]}`;

         return `${year}-${month}-${day}`;
      }
   }

   // data is the inputted information
   const onSubmit = (data) => {
      editTask(data, task);
   };

   return (
      <div className={styles.ModalEditTask}>
         <button
            className={styles.ModalTaskBtns}
            onClick={() => {
               cancelEdit(false);
               closeModal(false);
            }}
         >
            Close
         </button>
         <h3 id="Modal--Header">Editing Task</h3>
         <form className={styles.ModalTaskFormFlex} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.ModalTaskInputs}>
               <label>Title</label>
               <input
                  defaultValue={task.title}
                  type="text"
                  placeholder="title"
                  {...register("title", { required: true })}
               />
            </div>

            <div className={styles.ModalTaskInputs}>
               <label>Date</label>
               <input
                  type="date"
                  defaultValue={convertDateToIso(task.date)}
                  {...register("date", { required: true })}
               />
            </div>

            <div className={styles.ModalTaskInputs}>
               <label>Task Completed?</label>
               <select defaultValue={task.completed} {...register("completed", { required: true })}>
                  <option value="true">Completed</option>
                  <option value="false">In Progress</option>
               </select>
            </div>

            <div className={styles.ModalTaskInputs}>
               <label>Description</label>
               <input
                  defaultValue={task.description}
                  type="text"
                  placeholder="description"
                  {...register("description", { required: true })}
               />
            </div>
            <input className={styles.ModalTaskBtns} type="submit" value="Submit Edit" />
         </form>
      </div>
   );
}