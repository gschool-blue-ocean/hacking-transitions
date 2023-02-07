import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SlLogout } from "react-icons/sl"
import SPTasks from "./Transition-Section/SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import SPChecklist from "./Transition-Section/SP-Checklist";
import styles from "../../styles/StudentPage.module.css";
import Chat from "../Chat";
import { useSelector } from "react-redux";
import ProfileEdit from "./Profile-Section/EditStudentv2";

export default function StudentPage({ viewClickedCohort }) {
  const [isEditOpen, setEditOpen] = useState(false);

  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));
  console.log(activeStudent)

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
    <main className={styles.container}>
      <div className={styles.StudentDashWrapper}>
        <div className={styles.SDashHeader}>
          <div className={styles.SDashheaderCol}>
            <h1>Student Portal</h1>
            <h1 id={styles.StuHeaderName}>Welcome, {activeStudent.first} {activeStudent.last}</h1>
          </div>
          <Link href={"/"} passHref>
            <a className={styles.LogOutLink}
              onClick={() => {
                localStorage.removeItem("currentUser");
                window.sessionStorage.removeItem("currentUser");
                // const auth = getAuth();
                // signOut(auth)
                //   .then(() => {
                //     // Sign-out successful.
                //     // alert("You have succesfully logged out");
                //   })
                //   .catch((error) => {
                //     // An error happened.
                //     console.log(error);
                //   });
              }}
            >
              <div className={styles.LogOutTab}>
                  <SlLogout />
                  <div>Logout</div>
              </div>
            </a>
          </Link>
          {/* <SPETStag userETS={activeStudent.ets_date} /> */}
        </div>
        <div className={styles.SDashInfocard}>
          <div className={styles.infoCardcontainer}>
            <ProfileEdit />
            <div className="styles.stuInfoETS">
              <h4 className={styles.personalInfoSpacing}>ETS Date</h4>
              <span>{activeStudent.ets_date}</span>
            </div>
            <h4 className={styles.personalInfoSpacing}>Personal Info</h4>
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
            <h4 className={styles.personalInfoSpacing}>Dependents</h4>
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
              <h4 className={styles.personalInfoSpacing}> Education </h4>
              <span className={styles.title}> Degree: </span>
              <span className={styles.answer}>
                {activeStudent.highest_education}
              </span>
            </div>
            <div>
              <h4 className={styles.personalInfoSpacing}> Relocation </h4>
              <span className={styles.title}> Planning to Relocate?: </span>
              <span className={styles.answer}>
                {activeStudent.planning_to_relocate ? "Yes" : "No"}
              </span>
            </div>
            <h4 className={styles.personalInfoSpacing}>Interests</h4>
            <div className={styles.title}>
              <span>{activeStudent.interests}</span>
            </div>
          </div>
        </div>
        <SPChecklist />
        <SPTasks activeStudent={activeStudent} />
        <Chat />
      </div>
    </main>
  );
}
