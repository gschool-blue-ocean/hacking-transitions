import axios from "axios";
import { useEffect, useState } from "react";
import s from '../../styles/AdminHomePage/CohortView.module.css'
import { useRouter } from "next/router";
import { BsFillArrowUpRight } from "react-icons/bs";
import { Button, Modal } from "react-bootstrap";
import App from "./EditStudentModal";
import EditStudentModal from "./EditStudentModal";
import { useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";

const CohortView = ({ currCohort }) => {
  const dispatch = useDispatch();
  const CohortView = ({currCohort}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //handle click for individual students
  const handleClick = (e) => {
    const data = e.target.dataset;
    dispatch(setActiveStudent(currCohort[0].students[data.student_id]));
    router.push({
      pathname: "/admin/viewstudent",
      
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
      <div className={s.container}>
        {currCohort.map((cohort) => (
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
                {cohort.students.map((student, index) => (
                  <tr className={s.tr}>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.first}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.last}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.ets_date}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.leave_start_date}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.branch}
                      </btn>
                    </td>
                    <td>
                      <App
                        student_id={student.user_id}
                        currCohor={currCohort}
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
}

export default CohortView
