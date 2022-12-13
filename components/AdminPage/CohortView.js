import { useEffect, useState } from "react";
import { getDaysToEts } from "../../utility";
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
import CohortFilterTable from "./CohortFilterTable";

const CohortView = ({ currCohort, setCurrCohort, setChatCohort}) => {
  const [clickedCohort, setClickedCohort] = useState([]);

 
  if (currCohort.length == 0) {
    return (
      <div className={s.default}>
        <h1>Select A Cohort to begin</h1>
      </div>
    );
  } else {
    return (
      <>
        <CohortFilterTable setClickedCohort={setClickedCohort} setCurrCohort={setCurrCohort} currCohort={currCohort} setChatCohort={setChatCohort} />
      </>
      
    );
  }
};

export default CohortView;

