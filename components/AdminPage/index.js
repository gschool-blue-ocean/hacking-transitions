import s from '../../styles/AdminPage.module.css'
import CohortMenu from './CohortMenu'
import CohortView from './CohortView'
import Chat from '../Chat'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CreateCohort from './CreateCohort'
const AdminContainer =  () => {
  const allCohorts = useSelector(({app:{allCohortsData}}) => allCohortsData )
    //redux state ^^
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

  return (
    <div className={s.background}>
      <div className={s.container}>
        <div className={s.tools_container}>
         <CreateCohort />
         <CohortMenu cohorts={cohorts} currCohort={currCohort} setCurrCohort={setCurrCohort} students={students} />
        </div>
        <CohortView students={students} currCohort={currCohort} />
      </div>
    </div>
  )
}

export default AdminContainer;