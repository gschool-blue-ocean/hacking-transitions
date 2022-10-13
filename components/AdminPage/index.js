import s from '../../styles/AdminHomePage/AdminPage.module.css'
import CohortMenu from './CohortMenu'
import CohortView from './CohortView'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CreateCohort from './CreateCohort'
import { motion } from 'framer-motion'
import RevealChat from './RevealChat'
const AdminContainer =  () => {
  const allCohorts = useSelector(({app:{allCohortsData}}) => allCohortsData )

    //redux state ^^
  const [menuClicked, setMenuClicked] = useState(false)
  const [students, setStudents] = useState([])
  const [cohorts, setCohorts] = useState(allCohorts)
  const [currCohort, setCurrCohort] = useState([])
  useEffect(() => {
      axios({
      method: 'get',
      url: '/api/users/students',
    }).then((res) => {
      setStudents(res.data)
      if (cohorts.length > 0) {
        console.log(res)
        let topcohort = cohorts[cohorts.length - 1]
        let filtStudents = res.data.filter((student) => student.cohort_id == topcohort.cohort_id)
        setCurrCohort([{cohort_id: topcohort.cohort_id, cohort_name: topcohort.cohort_name, students: filtStudents}])
        } 
    })
  }, [])
  const toggleClickedMenu = () => {
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
         <CreateCohort />
         <div onClick={toggleClickedMenu}>
         <CohortMenu  cohorts={cohorts} currCohort={currCohort} setCurrCohort={setCurrCohort} students={students} />
         </div>
         <motion.div initial="enter" animate={menuClicked ? "exit" : "enter" } variants={moveMenuAnimate}> 
          <RevealChat />
         </motion.div>
        </div>
        <CohortView students={students} currCohort={currCohort} />
    </div>
  </div>
  )
}

export default AdminContainer;