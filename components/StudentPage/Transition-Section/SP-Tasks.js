import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SPTaskModal from "./SP-TaskModal";
import SPEditTask from "./SP-EditTask";
import SPCreateTask from "./SP-CreateTask";
import { AiOutlineEdit } from "react-icons/ai";
import { BiMessageAltAdd } from "react-icons/bi";
import styles from "../../../styles/StudentPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStudentTasks } from "../../../redux/features/app-slice";

//task modal styling
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightgray",
    borderRadius: "10px",
    width: "35%",
  },
};

export default function SPTasks({ activeStudent }) {
  const studentTasks = useSelector(({app: {studentTasks}}) => (studentTasks));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEditTask(false);
    setCreateTask(false);
  }

  function viewTask(task) {
    setSelectedTask(task);
    openModal();
  }

  useEffect(() => {
    setTimeout(() => {getTasks()}, '0140');
  }, [activeStudent, selectedTask, createTask, editTask, modalIsOpen]);

  function modalRendering() {
    if (editTask) {
      return (
        <SPEditTask
          task={selectedTask}
          closeModal={setIsOpen}
          cancelEdit={setEditTask}
        />
      );
    } else if (createTask) {
      return (
        <SPCreateTask
          student={activeStudent}
          closeModal={setIsOpen}
          cancelCreate={setCreateTask}
        />
      );
    } else {
      return <SPTaskModal task={selectedTask} closeModal={setIsOpen} />;
    }
  }

  const getTasks = () => {
    if (activeStudent.user_id) {
      fetch(`api/tasks/student/${activeStudent.user_id}`)
        .then((res) => res.json())
        .then((tasks) => {
          dispatch(setStudentTasks(tasks));
        });
    }
  };

  return (
    <div className={styles.SDashTasks}>
      <h4 id="StuTasksHeader">Tasks</h4>
      <button
        className={styles.StuTasksCreateBtn}
        onClick={() => {
          setCreateTask(true);
          openModal();
        }}
      >
        <BiMessageAltAdd />
      </button>
      <>
        {studentTasks.length === 0 ? (
          <div>{activeStudent.first} has not started a task</div>
        ) : (
          studentTasks.map((task) => {
            return (
              <div className={styles.StuTasksCard} key={task.task_id}>
                <div
                  className={styles.StuTasksTitle}
                  key={task.task_id}
                  id={task.task_id}
                  onClick={() => {
                    viewTask(task);
                  }}
                >
                  {task.title}
                </div>
                <button
                  className={styles.StuTasksButtons}
                  onClick={() => {
                    setEditTask(true);
                    openModal();
                    setSelectedTask(task);
                  }}
                >
                  <AiOutlineEdit />
                </button>
              </div>
            );
          })
        )}
      </>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        {modalRendering()}
      </Modal>
    </div>
  );
}
