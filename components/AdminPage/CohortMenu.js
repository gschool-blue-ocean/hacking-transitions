import s from '../../styles/AdminPage.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'

const CohortMenu = ({cohorts,students, setCurrCohort }) => {
  const [isClicked, toggleClicked] = useState(false);
  //filter out none active cohorts
  cohorts = cohorts.filter((cohort) => cohort.active)
  const handleClick = (e) => {
      const data = e.target.dataset
      const id = data.cohort_id
      let filtStudents = students.filter((student) => student.cohort_id == id)
      setCurrCohort({cohort_id: id, cohort_name: data.cohort_name, students: filtStudents})
  }

  const toggleClickedMenu = () => {
    toggleClicked(!isClicked);
  };
  //animation for dropdown menu
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5
      },
      display: "block"
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3
      },
      transitionEnd: {
        display: "none"
      }
    }
  }
  return (
    <div className={s.menucontainer}> 
    <div className={s.menutitle}>
      <motion.btn 
        onClick={toggleClickedMenu}
        className={s.titlebtn}>
     Cohorts
     </motion.btn>
    </div>
    <div className={s.cohortsmenu}> 
      <motion.div 
          initial="exit"
          animate={isClicked ? "enter" : "exit"}
          variants={subMenuAnimate}>
        {cohorts.map(cohort => {return (
            <div className={s.listitem}>
              <btn className={s.cohortbtn} onClick={handleClick} 
              data-active={cohort.active} 
              data-cohort_id={cohort.cohort_id}
              data-cohort_name={cohort.cohort_name}
              data-end_date={cohort.end_date}
              data-start_date={cohort.start_date}
              >{cohort.cohort_name}</btn>
            </div>
         )}
        )}
      </motion.div >
    </div>
  </div>
  )
}

export default CohortMenu