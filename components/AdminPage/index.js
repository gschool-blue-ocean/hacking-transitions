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
    axios({
      method: "get",
      url: "/api/cohorts",
    }).then((res) => setCohorts(res.data));
    // let filtStudents = students.filter((student) => student.cohort_id == id)
    // setCurrCohort({cohort_id: id, cohort_name: data.cohort_name, students: filtStudents})
  }, []);
  return (
    <div className={s.container}>
      <div className={s.menucontainer}>
        <div className={s.menutitle}>
          <motion.btn
          // onClick={toggleHoverMenu}
          >
            Cohorts
          </motion.btn>
        </div>
        <div className={s.cohortsmenu}>
          <motion.ul
            initial="exit"
            //animate={isHover ? "enter" : "exit"}
            variants={subMenuAnimate}
          >
            {cohorts.map((cohort) => {
              return (
                <li className={s.listitem}>
                  <btn className={s.cohortbtn} onClick={handleClick}>
                    {cohort}
                  </btn>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
