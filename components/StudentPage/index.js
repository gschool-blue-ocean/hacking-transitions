import React, { useEffect } from "react";
import SPTasks from "./SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import SPChecklist from "./SP-Checklist";
import style from "../../styles/StudentNew/StudentUi.module.css";
// import styles from "../../styles/StudentPage.module.css"
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
    <div className={style.mainStage}>
      <div className={style.subBar}>
        <div className={style.welcomeCont}>
            <h1 className={style.welcome}>Student Portal</h1>
            <h1 className={style.welcome}>Welcome, {activeStudent.first} {activeStudent.last}</h1>
        </div>
        <Link href={"/"} passHref>
            <a
              className={style.logOutTabLink}
              onClick={() => {
                const auth = getAuth();
                localStorage.removeItem("currentUser");
                window.sessionStorage.removeItem("currentUser");
                signOut(auth).then(() => {
                  // Sign-out successful.
                  alert('You have succesfully logged out');
                }).catch((error) => {
                  // An error happened.
                  console.log(error);
                });
              }}
            >
            <div className={style.logOutTab}>
              <svg className={style.vector} height="48" width="48">
                <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z"/>
              </svg>
              <div className={style.logOut}>Log Out</div>
            </div>
          </a>
      </Link>
      </div>
      <div className={style.lowerStage}>
          <div className={style.studentContainer}>
            <div className={style.profileSection}>
              <div className={style.profileSectionInner}>
                  <div>Icon</div>
                  <div>Picture</div>
                  <h1>{activeStudent.first} {activeStudent.last}</h1>
                  <h2>Cohort</h2>
                  <div>Email:</div>
                  <div>{activeStudent.email}</div>
                  <div>Duty Station:</div>
                  <div>{activeStudent.duty_station}</div>
                  <div>Military Branch:</div>
                  <div>{activeStudent.branch}</div>
                  <div>About Me</div>
                  <p>adsfhnasdkjfhas</p>
              </div>
            </div>
            <div className={style.transitionSection}>
                <div className={style.progressSection}></div>
                <div className={style.transitionSectionLower}></div>
            </div>
            <div className={style.chatSection}>
              <Chat />
            </div>
          </div>
          <div className={style.resourceContainer}>
            <div className={style.resourceTitle}></div>
            <div className={style.resourceSection}></div>
          </div>
      </div>
    </div>
  );
}