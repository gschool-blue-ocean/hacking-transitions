import s from "../../styles/AdminPage.module.css";
import CohortMenu from "./CohortMenu";
import CohortView from "./CohortView";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminContainer = () => {
  const [students, setStudents] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [currCohort, setCurrCohort] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/users/students",
    }).then((res) => setStudents(res.data));
    //**** UPDATE TO REDUX FOR COHORTS ********/
    axios({
      method: "get",
      url: "/api/cohorts",
    }).then((res) => setCohorts(res.data));
  }, []);
  useEffect(() => {
    if (cohorts.length > 0) {
      let topcohort = cohorts[cohorts.length - 1];
      let filtStudents = students.filter(
        (student) => student.cohort_id == topcohort.cohort_id
      );
      setCurrCohort([
        {
          cohort_id: topcohort.cohort_id,
          cohort_name: topcohort.cohort_name,
          students: filtStudents,
        },
      ]);
    }
  }, [cohorts]);
  return (
    <div className={s.container}>
      <div className={s.menucontainer}>
        <div className={s.menutitle}>
          <button
          // onClick={toggleHoverMenu}
          >
            Cohorts
          </button>
        </div>
        <div className={s.cohortsmenu}>
          <ul
            initial="exit"
            //animate={isHover ? "enter" : "exit"}
            // variants={subMenuAnimate}
          >
            {cohorts.map((cohort) => {
              return (
                <li className={s.listitem}>
                  <btn
                    className={s.cohortbtn}
                    // onClick={handleClick}
                  >
                    {cohort.cohort_name}
                  </btn>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
