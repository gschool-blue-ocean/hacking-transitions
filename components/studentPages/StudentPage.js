import React, { useState, useContext, useEffect } from "react";
import SPTasks from "./SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import "../../styles/StudentPage.module.css";
// import "../../StyleSheets/StudentPage.css";
// import SideNav from "../SideNav/SideNav";
// import LoginContext from "../../Context/LoginContext";
// import ChatModal from "../../Components/Chat/ChatModal";
import { FiEdit } from "react-icons/fi";
import EditStudentModal from "./EditStudentModal";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--clr-primary-accent)",
      borderRadius: "10px",
      width: "30%",
   },
};

// Modal.setAppElement(".AppContainer");

export default function StudentPage({
   modalIsOpen,
   setModalIsOpen,
   activeStudent,
   setActiveStudent,
   allUsersData,
   socket,
   viewClickedCohort,
}) {
//    const { userData, setUserData } = useContext(LoginContext);
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
      <div className="test--grid">
         {/* {userData.admin && (
            <SideNav
               viewClickedCohort={viewClickedCohort}
               activeStudent={activeStudent}
               setActiveStudent={setActiveStudent}
            />
         )} */}
         <div className="container">
         <div className="StudentDash--Wrapper">
            <div className="SDash--Header">
               <h3 id="StuHeader--Name">
                  {/* {activeStudent.first} {activeStudent.last} */}
                  John Doe
               </h3>
               <p id="StuHeader--Branch">
                  {/* {activeStudent.branch} */}
                  Navy
               </p>
               <SPETStag userETS='today'
               // {activeStudent.ets_date}
                />
            </div>

            {/* User Data Card */}
            <div className="SDash--Info-card">
               <div className="infoCard--container">
                  <ul>
                     <div>
                        {showEditStudentModal && (
                           <EditStudentModal
                              setUserData={setUserData}
                              userData={userData}
                              setShowEditStudentModal={setShowEditStudentModal}
                              activeStudent={activeStudent}
                              setActiveStudent={setActiveStudent}
                           />
                        )}
                        <div onClick={handleEditBtnClicked} className="editStudentBtnSpan">
                           <FiEdit className="editStudentInfoBtn" />
                           <div className="editStudentToolTip">Edit</div>
                        </div>
                     </div>

                     <li>
                        <h4 className="text-left">ETS Date</h4>
                        <span>
                           nov 28
                           {/* {activeStudent.ets_date} */}
                           </span>
                     </li>

                     <h4 className="text-left">Personal Info</h4>
                     <li>
                        <span className="title"> Email: </span>
                        <span className="answer">
                           {/* {activeStudent.email} */}
                           johndoe.email.com
                           </span>
                     </li>
                     <li>
                        <span className="title under-line"> MOS: </span>
                        <span className="answer"> 
                        {/* {activeStudent.mos}  */}
                        69B
                        </span>
                     </li>
                     <li>
                        <span className="title"> Rank: </span>
                        <span className="answer"> 
                        {/* {activeStudent.rank}  */}
                        E13
                        </span>
                     </li>
                     <li>
                        <span className="title"> Duty Station: </span>
                        <span className="answer"> 
                        {/* {activeStudent.duty_station} */}
                        my house
                        </span>
                     </li>
                     <li>
                        <span className="title"> Terminal Leave: </span>
                        <span className="answer"> 
                        {/* {activeStudent.leave_start_date} */}
                        tomorrow
                        </span>
                     </li>

                     <li>
                        <span className="title"> TAP Status: </span>
                        <span className="answer"> 
                        {/* {activeStudent.taps_complete ? "Complete" : "Incomplete"}  */}
                        complete
                        </span>
                     </li>

                     <h4 className="text-left">Dependents</h4>
                     <li className="title">
                        <span>
                           {/* {activeStudent.has_dependents ? <SPDependents student={activeStudent} /> : "None"} */}
                           None
                           </span>
                     </li>

                     <li>
                        <h4 className="text-left"> Education </h4>
                        <span className="title"> Degree: </span>
                        <span className="answer"> 
                        {/* {activeStudent.highest_education} */}
                        grade 7
                        </span>
                     </li>

                     <li>
                        <h4 className="text-left"> Relocation </h4>
                        <span className="title"> Planning to Relocate?: </span>
                        <span className="answer"> 
                        {/* {activeStudent.planning_to_relocate ? "Yes" : "No"} */}
                        Yes
                        </span>
                     </li>

                     <h4>Interests</h4>
                     <li className="title">
                        <span>
                           {/* {activeStudent.interests} */}
                           interested in everything
                           </span>
                     </li>
                  </ul>
               </div>
            </div>
            <SPTasks activeStudent='activestudent'
            // {activeStudent} 
            />
            {/* <ChatModal socket={socket} activeStudent={activeStudent} /> */}
         </div >
      </div >

      </div>
   );
}
