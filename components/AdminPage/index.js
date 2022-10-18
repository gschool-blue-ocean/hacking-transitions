import s from '../../styles/AdminHomePage/AdminPage.module.css'
import CohortMenu from "./CohortMenu";
import CohortView from "./CohortView";
import Chat from "../Chat";
import { motion } from 'framer-motion'
import { useState, useEffect } from "react";
import { server } from "../../utility";
import RevealChat from './RevealChat'
const AdminContainer = ({ allCohorts }) => {
  const [cohorts] = useState(allCohorts);
  const [currCohort, setCurrCohort] = useState([]);
  const [menuClicked, setMenuClicked] = useState(false)
  useEffect(() => {
    (async () => {
      if (cohorts.length > 0) {
        const topcohort = cohorts[cohorts.length - 1];
        const students = await (
          await fetch(`${server}/api/users/cohort/${topcohort.cohort_id}`)
        ).json();
        setCurrCohort([
          {
            cohort_id: topcohort.cohort_id,
            cohort_name: topcohort.cohort_name,
            students,
          },
        ]);
      }
    })();
  }, []);
  const toggleMoveChat = () => {
    setMenuClicked(!menuClicked);
  };
  const moveMenuAnimate = {
    enter: {
      y:0,
      transition: {
        duration: 0.5,
        delay: .1
      },
    },
    exit: {
      y: 300,
      transition: {
        duration: 0.5,
        delay: 0.3
      },
      transitionEnd: {
         
      }
    }
  };
  return (
    <div className={s.background}>
      <div className={s.container}>
        <div className={s.tools_container}>
         <div >
            <CohortMenu toggleMoveChat={toggleMoveChat} cohorts={cohorts} currCohort={currCohort} setCurrCohort={setCurrCohort}  />
         </div>
         <motion.div initial="enter" animate={menuClicked ? "exit" : "enter" } variants={moveMenuAnimate}> 
          <RevealChat />
         </motion.div>
        </div>
        <CohortView setCurrCohort={setCurrCohort} currCohort={currCohort} />
    </div>
  </div>
  )
}

export default AdminContainer;
