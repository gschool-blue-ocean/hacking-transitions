import s from '../../styles/AdminPage.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'

const CohortMenu = ({cohorts}) => {
  const [isClicked, toggleClicked] = useState(false);
  //filter out none active cohorts
  cohorts = cohorts.filter((cohort) => cohort.active)
  const handleClick = () => {
    console.log('click')
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
              <btn className={s.cohortbtn} onClick={handleClick} data={cohort}>{cohort.cohort_name}</btn>
            </div>
         )}
        )}
      </motion.div >
    </div>
  </div>
  )
}

export default CohortMenu