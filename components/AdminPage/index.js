import s from '../../styles/AdminPage.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
const AdminContainer = () => {
  const cohorts = [
    'MCSP-11',
    'MCSP-12',
    'MCSP-13',
    'MCSP-14',
    'MCSP-15'
  ]
  const handleClick = () => {
    console.log('click')
  }
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
    <div className={s.container}>
      <div className={s.menucontainer}> 
        <div className={s.menutitle}>
          <motion.btn 
            onClick={toggleHoverMenu}>
         Cohorts
         </motion.btn>
        </div>
        <div className={s.cohortsmenu}> 
          <motion.ul 
              initial="exit"
              animate={isHover ? "enter" : "exit"}
              variants={subMenuAnimate}>
            {cohorts.map(cohort => {return (
                <li className={s.listitem}>
                  <btn className={s.cohortbtn} onClick={handleClick}>{cohort}</btn>
                </li>
             )}
            )}
          </motion.ul >
        </div>
      </div>
      
    </div>
  )
}

export default AdminContainer