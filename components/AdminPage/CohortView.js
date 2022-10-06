import axios from 'axios'
import { useEffect, useState } from 'react'
import s from '../../styles/CohortView.module.css'
const CohortView = ({currCohort}) => {
  if (currCohort.length == 0) {
    return ( 
      <div>No data</div>
    ) 
    } else {
    return (
    <div className={s.container}>
      {currCohort.map((cohort) => 
      <div className={s.table}>
        <h3>{cohort.cohort_name}</h3>
      <table className={s.table}>
            <tr>
              <th className={s.tableheaders}>First</th>
              <th className={s.tableheaders}>Last</th>
              <th className={s.tableheaders}>ETS</th>
              <th className={s.tableheaders}>Terminal</th>
              <th className={s.tableheaders}>Branch</th>
            </tr> 
            {cohort.students.map(student =>
            <tr>
              <td><btn>{student.first}</btn></td>
              <td><btn>{student.last}</btn></td>
              <td><btn>{student.ets_date}</btn></td>
              <td><btn>{student.leave_start_date}</btn></td>
              <td><btn>{student.branch}</btn></td>
            </tr>
            )}
        </table>
        </div>
        )}

    </div>
  )
}
}

export default CohortView