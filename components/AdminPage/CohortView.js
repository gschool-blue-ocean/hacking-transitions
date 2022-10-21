import { useEffect, useState } from "react";
import { getDaysToEts } from "../../utility";
import Link from "next/link";
import s from "../../styles/AdminHomePage/CohortView.module.css";
import etsStyle from "../../styles/StudentPage.module.css";
import App from "./EditStudentModal";
import { useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import { motion } from "framer-motion";
const CohortView = ({ currCohort, setCurrCohort }) => {
  const dispatch = useDispatch();
  const [clickedCohort, setClickedCohort] = useState([]);

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
                  const daysToEts = getDaysToEts(student.ets_date);
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
                          <ColorEts daysToEts={daysToEts}>
                        <td>
                            <btn className={s.td}>{student.ets_date}</btn>
                        </td>
                          </ColorEts>
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
      <Link href={{ pathname: link, query: { id } }}>{children}</Link>
    </>
  );
};
const ColorEts = ({ daysToEts, children }) => {
  if (daysToEts <= 0) {
    return (
      <div id={`${etsStyle.ETSd}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 0 && daysToEts <= 30) {
    return (
      <div id={`${etsStyle.ETS30}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 30 && daysToEts <= 60) {
    return (
      <div id={`${etsStyle.ETS60}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 60 && daysToEts <= 90) {
    return (
      <div id={`${etsStyle.ETS90}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 90 && daysToEts <= 120) {
    return (
      <div id={`${etsStyle.ETS120}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else {
    return (
      <div id={`${etsStyle.ETS120}`} className={`${etsStyle.adminColoring}`}>
        120+ Days
      </div>
    );
  }
};
