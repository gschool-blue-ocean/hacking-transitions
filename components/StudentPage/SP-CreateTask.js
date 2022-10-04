import React from "react";
import { useForm } from "react-hook-form";

export default function SPCreateTask({ student, closeModal, cancelCreate }) {
   const { register, handleSubmit } = useForm();

   const onSubmit = (data) => {
      addTask(data);
      closeModal(false);
   };

   const addTask = (data) => {
      const newTask = {
         student_id: student.user_id,
         title: data.title,
         date: convertDateToIso(data.date),
         description: data.description,
         remarks: null,
         completed: JSON.parse(data.completed),
      };

      fetch(`https://hacking-transition.herokuapp.com/api/create/task`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newTask),
      });
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

   return (
      <div className="Modal--CreateTask">
         <button
            className="Modal--TaskBtns"
            onClick={() => {
               cancelCreate(false);
               closeModal(false);
            }}
         >
            Close
         </button>
         <h3 id="Modal--Header">Creating Task</h3>
         <form className="Modal--TaskFormFlex" onSubmit={handleSubmit(onSubmit)}>
            <div className="Modal--TaskInputs">
               <label>Title</label>
               <input type="text" {...register("title", { required: true })} />
            </div>

            <div className="Modal--TaskInputs">
               <label>Date</label>
               <input type="date" {...register("date", { required: true })} />
            </div>

            <div className="Modal--TaskInputs">
               <label>Description</label>
               <input type="text" {...register("description", { required: true })} />
            </div>

            <div className="Modal--TaskInputs">
               <label>Is this task completed?</label>
               <select defaultValue="false" {...register("completed", { required: true })}>
                  <option value="true">Completed</option>
                  <option value="false">In Progress</option>
               </select>
            </div>

            <input className="Modal--TaskBtns" type="submit" value="Create Task" />
         </form>
      </div>
   );
}
