import s from '../../styles/AdminHomePage/AdminPage.module.css'
import CohortMenu from "./CohortMenu";
import CohortView from "./CohortView";
import { motion } from 'framer-motion'
import { useState, useEffect } from "react";
import RevealChat from './RevealChat'

const AdminContainer = ({ allCohorts }) => {
  const [cohorts] = useState(allCohorts);
  const [currCohort, setCurrCohort] = useState([]);
  const [menuClicked, setMenuClicked] = useState(false)
  const [chatCohort,setChatCohort] = useState('')

  useEffect(() => {
    (async () => {
      if (cohorts.length > 0) {
        const topcohort = cohorts[cohorts.length - 1];
        const students = await (
          await fetch(`/api/users/cohort/${topcohort.cohort_id}`)
        ).json();
        setCurrCohort([
          {
            cohort_id: topcohort.cohort_id,
            cohort_name: topcohort.cohort_name,
            students,
          },
        ]);
      }
    })();
  }, []);
  const toggleMoveChat = () => {
    setMenuClicked(!menuClicked);
  };
  const moveMenuAnimate = {
    enter: {
      y:0,
      transition: {
        duration: 0.5,
        delay: .1
      },
    },
    exit: {
      y: 300,
      transition: {
        duration: 0.5,
        delay: 0.3
      },
      transitionEnd: {
         
      }
    }
  };
  return (
  //   <div className={s.background}>
  //     <div className={s.container}>
  //       <div className={s.tools_container}>
  //        <div >
  //           <CohortMenu  setChatCohort={setChatCohort} toggleMoveChat={toggleMoveChat} cohorts={cohorts} currCohort={currCohort} setCurrCohort={setCurrCohort}  />
  //        </div>
  //        <motion.div initial="enter" animate={menuClicked ? "exit" : "enter" } variants={moveMenuAnimate}> 
  //         <RevealChat chatCohort={chatCohort}/>
  //        </motion.div>
  //       </div>
  //       <CohortView  setCurrCohort={setCurrCohort} currCohort={currCohort} setChatCohort={setChatCohort} />
  //   </div>
  // </div>
  <div className="container-center-horizontal">
  <div className="desktop-1 screen">
    <div className="overlap-group7">
      <div className="page-accents">
        <div className="bottom-blur"></div>
        <div className="upper-blur"></div>
      </div>
      <div className="overlap-group darkergrotesque-normal-white-20px">
        <p className="x2022-galvanize-all-rights-reserved"></p>
        <p className="privacy-policy-ter"></p>
      </div>
      <div className="overlap-group1">
        <div className="nothing">
          <div className="rectangle-27"></div>
        </div>
        <div className="display-container"></div>
      </div>
      <div className="overlap-group4">
        <img className="profile-details-container"  alt="Profile Details-Container" />
        <div className="job-title"></div>
        <div className="employee-name"></div>
        <div className="profile-picture-section">
          <img className="profile-picture" alt="Profile Picture" />
        </div>
        <div className="overlap-group3">
          <div className="cohort-container">
            <div className="cohort-container-1">
              <div className="cohorts darkergrotesque-normal-white-50px"></div>
              <img className="cohort-tab" src="/img/cohort-tab.svg" alt="cohort-tab" />
            </div>
            <div className="cohort-body"></div>
          </div>
          <div className="overlap-group1-1">
            <div className="entry"></div>
            <div className="cohort darkergrotesque-normal-black-39px"></div>
          </div>
          <div className="cohort-upper-section">
            <div className="overlap-group-container">
              <div className="create-container">
                <div className="create-tab"></div>
                <div className="create darkergrotesque-normal-black-39px"></div>
              </div>
              <div className="delete-container">
                <div className="delete-tab"></div>
                <div className="delete darkergrotesque-normal-black-39px"></div>
              </div>
            </div>
            <div className="overlap-group-1 darkergrotesque-normal-black-39px">
              <div className="div"></div>
              <div className="active"></div>
              <div className="filter"></div>
            </div>
          </div>
        </div>
        <div className="place darkergrotesque-normal-white-50px"></div>
        <img className="icon-settings" src="/img/settings-icon.svg" alt="icon-settings" />
      </div>
      <div className="welcome-message darkergrotesque-normal-white-64px">
        <div className="welcome-message-item"></div>
        <div className="welcome-message-item"></div>
      </div>
      <div className="overlap-group5">
        <img className="vector" src="/img/vector.svg" alt="Vector" />
        <div className="log-out"></div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AdminContainer;
