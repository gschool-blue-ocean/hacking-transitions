import React, { useEffect } from "react";
import SPTasks from "./SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import SPChecklist from "./SP-Checklist";
import style from "../../styles/StudentNew/StudentUi.module.css";
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
              <div className={style.studentSettings}>
                  <svg id={style.studentIcon} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                    <path d="m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Z"/>
                  </svg>
              </div>
              <div className={style.profilePictureContainer}>
                <div className={style.profilePicture}></div>
                <h3>{activeStudent.first} {activeStudent.last}</h3>
                <h4>MCSP-16</h4>
              </div>
              <div className={style.studentDetails}>
                  <div>Email:</div>
                  <div>{activeStudent.email}</div>
                  <div>Duty Station:</div>
                  <div>{activeStudent.duty_station}</div>
                  <div>Military Branch:</div>
                  <div>{activeStudent.branch}</div>
                  <div>About Me</div>
                  <div className={style.aboutText}>
                    <p>
                      Im baby hexagon mumblecore intelligentsia, live-edge prism sus meh sriracha 3 wolf moon raw denim pok pok waistcoat forage. 
                      Paleo echo park art party gastropub locavore. Keffiyeh try-hard semiotics adaptogen flexitarian pour-over marfa lo-fi meh williamsburg bruh. 
                      Butcher chillwave crucifix narwhal. Enamel pin aesthetic DIY readymade ramps thundercats chambray, ethical hoodie glossier next level. Quinoa ascot 
                      tumblr tbh irony. Disrupt VHS fanny pack, hell of flexitarian cronut migas kinfolk.
                    </p>
                  </div>
              </div>
            </div>
          </div>
            <div className={style.transitionSection}>
                <div className={style.transitionSectionLower}>
                  <SPChecklist />
                  <h4 className={style.transitionDate}>Separation Date: {activeStudent.ets_date}</h4>
                </div>
            </div>
            <div className={style.chatSection}>
              <Chat />
            </div>
          </div>
      </div>
    </div>
  );
}