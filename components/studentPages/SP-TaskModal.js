import React from "react";

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
         <div className="SPTask--Modal">
            <h3 id="Modal--Header">{task.title}</h3>

            <div className="Modal--TaskStatus">
               <h4>Status</h4>
               <p>{task.completed ? "Completed" : "In Progress"}</p>
            </div>

            <div className="Modal--TaskDesc">
               <p>{task.date}</p>
               <h4>Description</h4>
               <p>{task.description}</p>
            </div>

            <button
               className="Modal--TaskBtns"
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
