<<<<<<< HEAD
import axios from "axios";
import { useEffect, useState } from "react";
import s from "../../styles/CohortView.module.css";
import { useRouter } from "next/router";
const CohortView = ({ currCohort }) => {
=======
import axios from 'axios'
import { useEffect, useState } from 'react'
import s from '../../styles/CohortView.module.css'
import { useRouter } from 'next/router'
import { BsFillArrowUpRight } from "react-icons/bs"
import { Button,Modal } from 'react-bootstrap'
import App from './EditStudentModal'
import EditStudentModal from './EditStudentModal'
const CohortView = ({currCohort}) => {
  const [show, setShow] = useState(false);
>>>>>>> 2914eedc72c852ce5c5235ae3b091a13c1515881
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //handle click for individual students
  const handleClick = (e) => {
    const data = e.target.dataset;
    const id = data.student_id;
    router.push({
      pathname: "/admin/viewstudent",
      query: { user_id: id },
    });
  };
  if (currCohort.length == 0) {
    return (
      <div className={s.default}>
        <h1>Select A Cohort to begin</h1>
      </div>
    );
  } else {
    return (
<<<<<<< HEAD
      <div className={s.container}>
        {currCohort.map((cohort) => (
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
              {cohort.students.map((student) => (
                <tr>
                  <td>
                    <btn
                      onClick={handleClick}
                      data-student_id={student.user_id}
                    >
                      {student.first}
                    </btn>
                  </td>
                  <td>
                    <btn
                      onClick={handleClick}
                      data-student_id={student.user_id}
                    >
                      {student.last}
                    </btn>
                  </td>
                  <td>
                    <btn
                      onClick={handleClick}
                      data-student_id={student.user_id}
                    >
                      {student.ets_date}
                    </btn>
                  </td>
                  <td>
                    <btn
                      onClick={handleClick}
                      data-student_id={student.user_id}
                    >
                      {student.leave_start_date}
                    </btn>
                  </td>
                  <td>
                    <btn
                      onClick={handleClick}
                      data-student_id={student.user_id}
                    >
                      {student.branch}
                    </btn>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        ))}
      </div>
    );
  }
};
=======
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
              <th className={s.tableheaders}>Edit</th>
            </tr> 
              {cohort.students.map(student =>
              <tr className={s.tr}>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.first}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.last}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.ets_date}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.leave_start_date}</btn></td>
                <td><btn className={s.td} onClick={handleClick} data-student_id={student.user_id}>{student.branch}</btn></td>
                <td><App student_id={student.user_id} currCohor={currCohort} /></td>
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

>>>>>>> 2914eedc72c852ce5c5235ae3b091a13c1515881

export default CohortView;
