import axios from 'axios'
import { useEffect, useState } from 'react'
import s from '../../styles/CohortView.module.css'
import { useRouter } from 'next/router'
const CohortView = ({currCohort}) => {
  const router = useRouter();
  //handle click for individual students
  const handleClick = (e) => {
    const data = e.target.dataset;
    const id = data.student_id;
    console.log('id', id)
    router.push({
      pathname: '/admin/viewstudent',
      query: { user_id: id }
    })
  }
  if (currCohort.length == 0) {
    return ( 
       <div className={s.default}>
        <h1>Select A Cohort to begin</h1>
       </div>
    ) 
    } else {
    return (
    <div className={s.container}>
      {currCohort.map((cohort) => 
      <div>
        <h1>{cohort.cohort_name}</h1>
      <div className={s.div}>
        <table className={s.table}>
            <tr className={s.headtr}>
              <th className={s.tableheaders}>First</th>
              <th className={s.tableheaders}>Last</th>
              <th className={s.tableheaders}>ETS</th>
              <th className={s.tableheaders}>Terminal</th>
              <th className={s.tableheaders}>Branch</th>
            </tr> 
              {cohort.students.map(student =>
              <tr className={s.tr}>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.first}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.last}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.ets_date}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.leave_start_date}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.branch}</btn></td>
              </tr>
              )}

          </table>
        </div>
        </div>
        )}
    </div>
  )
}
}


export default CohortView;
