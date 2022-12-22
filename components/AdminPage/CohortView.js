import { useEffect, useState } from "react";
import { getDaysToEts, useSortableData } from "../../utility";
import Link from "next/link";
import s from "../../styles/AdminHomePage/CohortView.module.css";
import etsStyle from "../../styles/StudentPage.module.css";
import App from "./EditStudentModal";
import { useDispatch } from "react-redux";
import {
  setActiveStudent,
  setStudentsForCohortChat,
} from "../../redux/features/app-slice";
import { motion } from "framer-motion";
import { BsChatText } from "react-icons/bs";
import CohortFilterTitle from "./CohortFilterTitle";
import EditCohortModal from '../AdminPage/EditCohortModal'

// CohortView component is the parent component to CohortFilterTitle
// Creates the container that will hold all of the Cohort Tables that populate from an on-Click event in the CohortMenu
// maps through CurrCohort and sets table titles and passes props down to CohortFilterTitle component

const CohortView = ({ currCohort, setCurrCohort, setChatCohort }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [clickedCohort, setClickedCohort] = useState([]);
  //handle click for cohort
  const handleClickedCohort = (e) => {
    const cohort_id = e.target.dataset.cohort_id;
    setClickedCohort(cohort_id);
  };

  console.log("sortableData:", currCohort)

  if (currCohort == 0) {
    return (
      <div className={s.default}>
        <h1>Select A Cohort to begin</h1>
      </div>
    );
  } else {
    return (
      <div className={s.container}>
        {currCohort.map((cohort, cohortIndex) => (
          <div key={cohort.cohort_id} >
            <h1>{cohort.cohort_name}
              <btn className={s.td}>
                <EditCohortModal
                  cohort={cohort} setCurrCohort={setCurrCohort}
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </btn>
            </h1>
            <div className={s.div}>
              <CohortFilterTitle index={cohortIndex} cohort={cohort} setClickedCohort={setClickedCohort} setCurrCohort={setCurrCohort} currCohort={currCohort} setChatCohort={setChatCohort} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CohortView;

