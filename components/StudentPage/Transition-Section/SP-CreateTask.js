import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setStudentTasks } from "../../../redux/features/app-slice";
import axios from "axios";

export default function SPCreateTask({ student, closeModal, cancelCreate }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const studentTasks = useSelector(({app: {studentTasks}}) => (studentTasks));

  const onSubmit = (data) => {
    addTask(data);
    closeModal(false);
  };

  //////////////////// POST request for adding tasks refactored to use axios ////////////////

  const addTask = async (data) => {
    const newTask = {
        student_id: student.user_id,
        title: data.title,
        date: convertDateToIso(data.date),
        description: data.description,
        remarks: null,
        completed: JSON.parse(data.completed),
    };
    let allTasks = [...studentTasks, newTask];
    dispatch(setStudentTasks(allTasks));

    try {
        await axios.post(`/api/tasks`, newTask, {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.log(err);
    }
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
    <div className={styles.ModalCreateTask}>
      <button
        className={styles.ModalTaskBtns}
        onClick={() => {
          cancelCreate(false);
          closeModal(false);
        }}
      >
        Close
      </button>
      <h3 id="Modal--Header">Creating Task</h3>
      <form
        className={styles.ModalTaskFormFlex}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.ModalTaskInputs}>
          <label>Title</label>
          <input type="text" {...register("title", { required: true })} />
        </div>

        <div className={styles.ModalTaskInputs}>
          <label>Date</label>
          <input type="date" {...register("date", { required: true })} />
        </div>

        <div className={styles.ModalTaskInputs}>
          <label>Description</label>
          <input type="text" {...register("description", { required: true })} />
        </div>

        <div className={styles.ModalTaskInputs}>
          <label>Is this task completed?</label>
          <select
            defaultValue="false"
            {...register("completed", { required: true })}
          >
            <option value="true">Completed</option>
            <option value="false">In Progress</option>
          </select>
        </div>

        <input
          className={styles.ModalTaskBtns}
          type="submit"
          value="Create Task"
        />
      </form>
    </div>
  );
}
