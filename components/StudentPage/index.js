import React, { useEffect } from "react";
import SPTasks from "./SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import SPChecklist from "./SP-Checklist";
import styles from "../../styles/StudentPage.module.css";
import Chat from "../Chat";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function StudentPage({ viewClickedCohort }) {
  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));

  useEffect(() => {
    document.querySelectorAll(".listOfCohorts").forEach((elem) => {
      elem.classList.remove("activeCohortTab");

      if (viewClickedCohort.cohort_id === +elem.id) {
        elem.classList.add("activeCohortTab");
      }
    });
  }, []);

  const handleEditBtnClicked = (e) => {
    console.log("show edit student modal");
  };

  return (
    <div className={styles.testgrid}>
      <div className={styles.container}>
        <div className={styles.StudentDashWrapper}>
          <div className={styles.SDashHeader}>
            <div className={styles.SDashheaderCol}>
              <h3 id={styles.StuHeaderName}>
                {activeStudent.first} {activeStudent.last}
              </h3>
              <p id={styles.StuHeaderBranch}>{activeStudent.branch}</p>
            </div>
            <SPETStag userETS={activeStudent.ets_date} />
          </div>
          <div className={styles.SDashInfocard}>
            <div className={styles.infoCardcontainer}>
              <div>
                <div
                  onClick={handleEditBtnClicked}
                  className={styles.editStudentBtnSpan}
                >
                  <Link href={"student/editStudentModal"}>
                    <FiEdit className={styles.editStudentInfoBtn} />
                  </Link>
                  <div className={styles.editStudentToolTip}>Edit</div>
                </div>
              </div>

              <div className="styles.stuInfoETS">
                <h4 className={styles.stuInfoETS}>ETS Date</h4>
                <span>{activeStudent.ets_date}</span>
              </div>
              <h4 className="text-left">Personal Info</h4>
              <div>
                <span className={styles.title}> Email: </span>
                <span className={styles.answer}>{activeStudent.email}</span>
              </div>
              <div>
                <span className="title under-line"> MOS: </span>
                <span className={styles.answer}>{activeStudent.mos}</span>
              </div>
              <div>
                <span className={styles.title}> Rank: </span>
                <span className={styles.answer}>{activeStudent.rank}</span>
              </div>
              <div>
                <span className={styles.title}> Duty Station: </span>
                <span className={styles.answer}>
                  {activeStudent.duty_station}
                </span>
              </div>
              <div>
                <span className={styles.title}> Terminal Leave: </span>
                <span className={styles.answer}>
                  {activeStudent.leave_start_date}
                </span>
              </div>
              <div>
                <span className={styles.title}> TAP Status: </span>
                <span className={styles.answer}>
                  {activeStudent.taps_complete ? "Complete" : "Incomplete"}
                </span>
              </div>
              <h4 className="text-left">Dependents</h4>
              <div className={styles.title}>
                <span>
                  {activeStudent.has_dependents ? (
                    <SPDependents student={activeStudent} />
                  ) : (
                    "None"
                  )}
                </span>
              </div>
              <div>
                <h4 className="text-left"> Education </h4>
                <span className={styles.title}> Degree: </span>
                <span className={styles.answer}>
                  {activeStudent.highest_education}
                </span>
              </div>
              <div>
                <h4 className="text-left"> Relocation </h4>
                <span className={styles.title}> Planning to Relocate?: </span>
                <span className={styles.answer}>
                  {activeStudent.planning_to_relocate ? "Yes" : "No"}
                </span>
              </div>
              <h4>Interests</h4>
              <div className={styles.title}>
                <span>{activeStudent.interests}</span>
              </div>
            </div>
          </div>
          <SPChecklist />
          <SPTasks activeStudent={activeStudent} />
          <Chat />
        </div>
      </div>
    </div>
  );
}