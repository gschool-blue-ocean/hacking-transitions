<<<<<<< HEAD
import s from "../../styles/AdminPage.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
const AdminContainer = () => {
  const cohorts = ["MCSP-11", "MCSP-12", "MCSP-13", "MCSP-14", "MCSP-15"];
  const handleClick = () => {
    console.log("click");
  };
  const [isClicked, toggleClicked] = useState(false);
  const toggleClickedMenu = () => {
    toggleHClicked(!isClicked);
  };
  // const [isMouse, toggleMouse] = React.useState(false);
  // const toggleMouseMenu = () => {
  //   toggleMouse(!isMouse);
  // };
  //animation for
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <div className={s.container}>
      <div className={s.menucontainer}>
        <div className={s.menutitle}>
          <motion.btn onClick={toggleClickedMenu}>Cohorts</motion.btn>
        </div>
        <div className={s.cohortsmenu}>
          <motion.ul
            initial="exit"
            // animate={isHover ? "enter" : "exit"}
            variants={subMenuAnimate}
          >
            {cohorts.map((cohort) => {
              return (
                <li className={s.listitem}>
                  <btn className={s.cohortbtn} onClick={handleClick}>
                    {cohort}
                  </btn>
                </li>
              );
            })}
          </motion.ul>
        </div>
=======
import s from '../../styles/AdminPage.module.css'
import CohortMenu from './CohortMenu'
import CohortView from './CohortView'
import { useState, useEffect } from 'react'
import axios from 'axios'
const AdminContainer = () => {
  const [students, setStudents] = useState([])
  const [cohorts, setCohorts] = useState([])
  const [currCohort, setCurrCohort] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/users/students',
    }).then((res) => setStudents(res.data))
    axios({
      method: 'get',
      url: '/api/cohorts'
    }).then((res) => setCohorts(res.data))
    // let filtStudents = students.filter((student) => student.cohort_id == id)
    // setCurrCohort({cohort_id: id, cohort_name: data.cohort_name, students: filtStudents})
  }, [])
  return (
    <div className={s.background}>
      <div className={s.container}>
        <CohortMenu cohorts={cohorts} currCohort={currCohort} setCurrCohort={setCurrCohort} students={students} />
        <CohortView students={students} currCohort={currCohort} />
>>>>>>> 3fae412034e4fd1c4d95cd52c63f27a27068bc88
      </div>
    </div>
  );
};

export default AdminContainer;
