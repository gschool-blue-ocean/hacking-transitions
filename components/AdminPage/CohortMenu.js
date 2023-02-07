import s from "../../styles/AdminHomePage/AdminPage.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setStudentsForCohortChat, setActiveStudent } from "../../redux/features/app-slice";
import axios from "axios";

const CohortMenu = ({ setChatCohort, setCurrCohort, cohorts, toggleMoveChat }) => {
  const dispatch = useDispatch();
  const [isClicked, toggleClicked] = useState(true);
  //filter out none active cohorts
  cohorts = cohorts.filter((cohort) => cohort.active);
  const handleClick = async (e) => {
    const data = e.target.dataset;
    const id = parseInt(data.cohort_id);
    //filter students based on cohort id retrieved by event.target
    const students = (
      await axios.get(`/api/users/cohort/${id}`)
    ).data;
    if (cohorts.length == 0) {
      setCurrCohort([
        {
          cohort_id: id,
          cohort_name: data.cohort_name,
          students,
        },
      ]);
    } else {
      //if cohort div is clicked, will remove, else removes cohort from state
      if (data.isclicked === "false") {
        setCurrCohort((oldCohort) =>
          oldCohort.concat({
            cohort_id: id,
            cohort_name: data.cohort_name,
            students,
          })
        );
        e.target.setAttribute("style", "color:#ff6900");
        data.isclicked = true;
      } else {
        setCurrCohort((oldCohort) =>
          oldCohort.filter((cohort) => cohort.cohort_id != id)
        );
        data.isclicked = false;
        e.target.setAttribute("style", "color:#003B4C");
        //console.log("cohortMenu currCohort2", currCohort)
      }
    }
  };
  const removeFromState = (id) => {
    setCurrCohort((cohort) =>
      cohort.filter((cohort) => cohort.cohort_id != id)
    );
  };
  const toggleCohortsBtn = (e) => {
    toggleClickedMenu(e)
    toggleMoveChat(e)
  }
  const toggleClickedMenu = () => {
    toggleClicked(!isClicked);
  };
  //animation for dropdown menu
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: .5, 
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <>
    <div className={s.menucontainer}>
      <div className={s.menutitle} onClick={toggleCohortsBtn}>
        <motion.btn className={s.titlebtn}>
          Cohorts
        </motion.btn>
      </div>
      <div className={s.cohortsmenu}>
        <motion.div
          initial="exit"
          animate={isClicked ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          {cohorts.map((cohort) => {
            return (
              <motion.div
                key={cohort.cohort_id}
                className={s.listitem}
                whileHover={{ scale: 1.2 }}
              >
                <motion.btn
                  className={s.cohortbtn}
                  onClick={handleClick}
                  data-isclicked={false}
                  data-active={cohort.active}
                  data-cohort_id={cohort.cohort_id}
                  data-cohort_name={cohort.cohort_name}
                  data-end_date={cohort.end_date}
                  data-start_date={cohort.start_date}
                >
                  {cohort.cohort_name}
                </motion.btn>{" "}
                <button className={s.messageBtn}
                  onClick={async () => {
                    const cohortStudents = (
                      await axios.get(
                        `/api/users/cohort/${cohort.cohort_id}`
                      )
                    ).data;
                    dispatch(setStudentsForCohortChat(cohortStudents));
                    dispatch(setActiveStudent({}));
                    setChatCohort(cohort.cohort_name)
                  }}
                  >
                  Message
                  </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
    
    </>
  );
};

export default CohortMenu;


