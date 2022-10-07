/* eslint-disable react/jsx-key */
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
    </div>
  )
}
}

export default CohortView