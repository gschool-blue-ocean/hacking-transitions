import s from '../../styles/AdminPage.module.css'
import CohortMenu from './CohortMenu'
import CohortView from './CohortView'
import { useState, useEffect } from 'react'
import axios from 'axios'
const AdminContainer = () => {
  const [students, setStudents] = useState([])
  const [cohorts, setCohorts] = useState([])
  const [currCohort, setCurrCohort] = useState([])
  useEffect( () => {
      axios({
      method: 'get',
      url: '/api/users/students',
    }).then((res) => setStudents(res.data))
       axios({
      method: 'get',
      url: '/api/cohorts'
    }).then((res) => setCohorts(res.data))
    .then((res) => 
      {
        let topcohort = cohorts[cohorts.length - 1]
        let filtStudents = students.filter((student) => student.cohort_id == topcohort.cohort_id)
        setCurrCohort([{cohort_id: topcohort.cohort_id, cohort_name: topcohort.cohort_name, students: filtStudents}])
      })
  }, [])
  return (
    <div className={s.background}>
      <div className={s.container}>
        <CohortMenu cohorts={cohorts} currCohort={currCohort} setCurrCohort={setCurrCohort} students={students} />
        <CohortView students={students} currCohort={currCohort} />
      </div>
    </div>
  )
}

export default AdminContainer