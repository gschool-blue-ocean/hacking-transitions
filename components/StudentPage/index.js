import React, { useState, useContext, useEffect } from "react";
import SPTasks from "./SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import styles from "../../styles/StudentPage.module.css"
// import "../../StyleSheets/StudentPage.css";
// import SideNav from "../SideNav/SideNav";
// import LoginContext from "../../Context/LoginContext";
// import ChatModal from "../../Components/Chat/ChatModal";
import { FiEdit } from "react-icons/fi";
import EditStudentModal from "./EditStudentModal";
import { useSelector } from "react-redux";

export default function StudentPage({
  modalIsOpen,
  setModalIsOpen,
  viewClickedCohort,
}) {
  const { currentUser, activeStudent } = useSelector(({app: {currentUser, activeStudent}}) => ({currentUser, activeStudent}))
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);

   useEffect(() => {
      document.querySelectorAll(".listOfCohorts").forEach((elem) => {
         elem.classList.remove("activeCohortTab");

         if (viewClickedCohort.cohort_id === +elem.id) {
            elem.classList.add("activeCohortTab");
         }
      });
   }, []);

   const handleEditBtnClicked = (e) => {
      setShowEditStudentModal(!showEditStudentModal);
   };

   console.log(activeStudent);

   return (
      <div className={styles.testgrid}>
         {/* {userData.admin && (
            <SideNav
               viewClickedCohort={viewClickedCohort}
               activeStudent={activeStudent}
               setActiveStudent={setActiveStudent}
            />
         )} */}

      <div className={styles.container}>
        <div className={styles.StudentDashWrapper}>
          <div className={styles.SDashHeader}>
            <div className={styles.SDashheaderCol}>
               <h3 id={styles.StuHeaderName}>
                 {activeStudent.first} {activeStudent.last}
               </h3>
               <p id={styles.StuHeaderBranch}>
                 {activeStudent.branch}
               </p>
            </div>
            <SPETStag
              userETS={activeStudent.ets_date}
            />
          </div>

          {/* User Data Card */}
          <div className={styles.SDashInfocard}>
            <div className={styles.infoCardcontainer}>
              <ul>
                <div>
                  {showEditStudentModal && (
                    <EditStudentModal
                    // setUserData={setUserData}
                    // userData={userData}
                    // setShowEditStudentModal={setShowEditStudentModal}
                    // activeStudent={activeStudent}
                    // setActiveStudent={setActiveStudent}
                    />
                  )}
                  <div
                    onClick={handleEditBtnClicked}
                    className={styles.editStudentBtnSpan}
                  >
                    <FiEdit className={styles.editStudentInfoBtn} />
                    <div className={styles.editStudentToolTip}>Edit</div>
                  </div>
                </div>

                <li>
                  <h4 className="text-left">ETS Date</h4>
                  <span>
                    {activeStudent.ets_date}
                  </span>
                </li>

                <h4 className="text-left">Personal Info</h4>
                <li>
                  <span className={styles.title}> Email: </span>
                  <span className={styles.answer}>
                    {activeStudent.email}
                  </span>
                </li>
                <li>
                  <span className="title under-line"> MOS: </span>
                  <span className={styles.answer}>
                    {activeStudent.mos} 
                  </span>
                </li>
                <li>
                  <span className={styles.title}> Rank: </span>
                  <span className={styles.answer}>
                    {activeStudent.rank} 
                  </span>
                </li>
                <li>
                  <span className={styles.title}> Duty Station: </span>
                  <span className={styles.answer}>
                    {activeStudent.duty_station}
                  </span>
                </li>
                <li>
                  <span className={styles.title}> Terminal Leave: </span>
                  <span className={styles.answer}>
                    {activeStudent.leave_start_date}
                  </span>
                </li>

                <li>
                  <span className={styles.title}> TAP Status: </span>
                  <span className={styles.answer}>
                    {activeStudent.taps_complete ? "Complete" : "Incomplete"} 
                  </span>
                </li>

                <h4 className="text-left">Dependents</h4>
                <li className={styles.title}>
                  <span>
                    {activeStudent.has_dependents ? <SPDependents student={activeStudent} /> : "None"}
                  </span>
                </li>

                <li>
                  <h4 className="text-left"> Education </h4>
                  <span className={styles.title}> Degree: </span>
                  <span className={styles.answer}>
                    {activeStudent.highest_education}
                  </span>
                </li>

                <li>
                  <h4 className="text-left"> Relocation </h4>
                  <span className={styles.title}> Planning to Relocate?: </span>
                  <span className={styles.answer}>
                    {activeStudent.planning_to_relocate ? "Yes" : "No"}
                  </span>
                </li>

                <h4>Interests</h4>
                <li className={styles.title}>
                  <span>
                    {activeStudent.interests}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <SPTasks
            activeStudent={activeStudent}
          />
          <Chat />
        </div>
      </div>
   );
}