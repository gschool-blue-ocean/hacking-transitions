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
<<<<<<< HEAD
        {/* <table className={s.table}>
          <tr>
            <th className={s.tableheaders}>First</th>
            <th className={s.tableheaders}>Last</th>
            <th className={s.tableheaders}>ETS</th>
            <th className={s.tableheaders}>Terminal</th>
            <th className={s.tableheaders}>Branch</th>
          </tr> 
          {currCohort !== [] ? currCohort.students.map(student =>
          <tr>
            <td>Alfreds</td>
            <td>Anders</td>
            <td>Germany</td>
            <td>11/05/2022</td>
            <td>90days</td>
          </tr>
            ) : <div>No data</div>}
      </table> */}
=======
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
>>>>>>> c29bfeb07d426beee81663c1928a6dc9315b1523
    </div>
  )
}
}

export default CohortView