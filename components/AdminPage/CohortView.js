import { useEffect, useState } from "react";
import Link from "next/link";
import s from "../../styles/AdminHomePage/CohortView.module.css";
import App from "./EditStudentModal";
import { useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import { motion } from "framer-motion";
const CohortView = ({ currCohort, setCurrCohort }) => {
  const dispatch = useDispatch();
  const [clickedCohort, setClickedCohort] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle click for cohort
  const handleClickedCohort = (e) => {
    const cohort_id = e.target.dataset.cohort_id;
    console.log("from handle clicked cohort", cohort_id);
    setClickedCohort(cohort_id);
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
          <div key={cohort.cohort_id}>
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
                {cohort.students.map((student, index) => {
                  return (
                    <motion.tr
                      whileHover={{ backgroundColor: "#F5F5F5" }}
                      className={s.tr}
                      key={student.user_id}
                      onClick={() => {
                        dispatch(setActiveStudent(student));
                        
                      }}
                    >
                      <LinkToViewStudent id={cohort.cohort_id}>
                        <td>
                          <btn className={s.td}>{student.first}</btn>
                        </td>
                      </LinkToViewStudent>

                      <LinkToViewStudent id={cohort.cohort_id}>
                        <td>
                          <btn className={s.td}>{student.last}</btn>
                        </td>
                      </LinkToViewStudent>

                      <LinkToViewStudent id={cohort.cohort_id}>
                        <td>
                          <btn className={s.td}>{student.ets_date}</btn>
                        </td>
                      </LinkToViewStudent>

                      <LinkToViewStudent id={cohort.cohort_id}>
                        <td>
                          <btn className={s.td}>{student.leave_start_date}</btn>
                        </td>
                      </LinkToViewStudent>

                      <LinkToViewStudent id={cohort.cohort_id}>
                        <td>
                          <btn className={s.td}>{student.branch}</btn>
                        </td>
                      </LinkToViewStudent>

                      <td>
                        <div>
                          <App
                            cohort_id={student.cohort_id}
                            setClickedCohort={setClickedCohort}
                            clickedCohort={clickedCohort}
                            setCurrCohort={setCurrCohort}
                            student_id={student.user_id}
                            currCohort={currCohort}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default CohortView;

const LinkToViewStudent = ({ children, id }) => {
  
  
  
  const link = "/admin/viewstudent";

  return (
    <>
    {/* {children} */}
     <Link href={{ pathname: link, query: { id  } }}>{children}</Link>
    </>
  );
};
