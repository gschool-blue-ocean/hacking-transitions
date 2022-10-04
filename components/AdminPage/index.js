import s from '../../styles/AdminPage.module.css'
import CohortMenu from './CohortMenu'
import CohortView from './CohortView'
import { useState, useEffect } from 'react'
import axios from 'axios'
const AdminContainer = () => {
  const [students, setStudents] = useState([])
  const [cohorts, setCohorts] = useState([])

  const [currCohort, setCurrCohort] = useState([])

  //let filtStudents = students.filter((student) => student.cohort_id == id)
  // setCurrCohort({cohort_id: id, cohort_name: data.cohort_name, students: filtStudents})


  useEffect(() => {
    axios({
        method: 'get',
        url: '/api/users/students',
    }).then((res) => setStudents(res.data))
    axios({
        method: 'get',
        url: '/api/cohorts'
    }).then((res) => setCohorts(res.data))
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