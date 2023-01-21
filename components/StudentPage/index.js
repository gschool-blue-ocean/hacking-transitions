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
                <div>Name</div>
                <div>Cohort</div>
                <div>Email</div>
                <div>Email email</div>
                <div>Duty Station</div>
                <div>Beale AFB</div>
                <div>Military Branch</div>
                <div>United States Air Force</div>
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
          <div>
            <div>

            </div>
          </div>
      </div>
    </div>
    // <div className="find_me">
    //   <div className={styles.container}>
    //     <div className={styles.StudentDashWrapper}>
    //       <div className={styles.SDashHeader}>
    //         <div className={styles.SDashheaderCol}>
    //           <h1 id={styles.StuHeaderName}>
    //             {activeStudent.first} {activeStudent.last}
    //           </h1>
    //           <p id={styles.StuHeaderBranch}>{activeStudent.branch}</p>
    //         </div>
    //         <SPETStag userETS={activeStudent.ets_date} />
    //       </div>
    //       <div className={styles.SDashInfocard}>
    //         <div className={styles.infoCardcontainer}>
    //           <div>
    //             <div
    //               onClick={handleEditBtnClicked}
    //               className={styles.editStudentBtnSpan}
    //             >
    //               <Link href={"student/editStudentModal"}>
    //                 <FiEdit className={styles.editStudentInfoBtn} />
    //               </Link>
    //               <div className={styles.editStudentToolTip}>Edit</div>
    //             </div>
    //           </div>
    //           <div className="styles.stuInfoETS">
    //             <h4 className={styles.personalInfoSpacing}>ETS Date</h4>
    //             <span>{activeStudent.ets_date}</span>
    //           </div>
    //           <h4 className={styles.personalInfoSpacing}>Personal Info</h4>
    //           <div>
    //             <span className={styles.title}> Email: </span>
    //             <span className={styles.answer}>{activeStudent.email}</span>
    //           </div>
    //           <div>
    //             <span className="title under-line"> MOS: </span>
    //             <span className={styles.answer}>{activeStudent.mos}</span>
    //           </div>
    //           <div>
    //             <span className={styles.title}> Rank: </span>
    //             <span className={styles.answer}>{activeStudent.rank}</span>
    //           </div>
    //           <div>
    //             <span className={styles.title}> Duty Station: </span>
    //             <span className={styles.answer}>
    //               {activeStudent.duty_station}
    //             </span>
    //           </div>
    //           <div>
    //             <span className={styles.title}> Terminal Leave: </span>
    //             <span className={styles.answer}>
    //               {activeStudent.leave_start_date}
    //             </span>
    //           </div>
    //           <div>
    //             <span className={styles.title}> TAP Status: </span>
    //             <span className={styles.answer}>
    //               {activeStudent.taps_complete ? "Complete" : "Incomplete"}
    //             </span>
    //           </div>
    //           <h4 className={styles.personalInfoSpacing}>Dependents</h4>
    //           <div className={styles.title}>
    //             <span>
    //               {activeStudent.has_dependents ? (
    //                 <SPDependents student={activeStudent} />
    //               ) : (
    //                 "None"
    //               )}
    //             </span>
    //           </div>
    //           <div>
    //             <h4 className={styles.personalInfoSpacing}> Education </h4>
    //             <span className={styles.title}> Degree: </span>
    //             <span className={styles.answer}>
    //               {activeStudent.highest_education}
    //             </span>
    //           </div>
    //           <div>
    //             <h4 className={styles.personalInfoSpacing}> Relocation </h4>
    //             <span className={styles.title}> Planning to Relocate?: </span>
    //             <span className={styles.answer}>
    //               {activeStudent.planning_to_relocate ? "Yes" : "No"}
    //             </span>
    //           </div>
    //           <h4 className={styles.personalInfoSpacing}>Interests</h4>
    //           <div className={styles.title}>
    //             <span>{activeStudent.interests}</span>
    //           </div>
    //         </div>
    //       </div>
    //       <SPChecklist />
    //       <SPTasks activeStudent={activeStudent} />
    //       <Chat />
    //     </div>
    //   </div>
    // </div>
  );
}