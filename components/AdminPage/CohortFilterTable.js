import s from "../../styles/AdminHomePage/CohortFilterTable.module.css";
import { getDaysToEts, useSortableData } from "../../utility";
import Link from "next/link";
import etsStyle from "../../styles/StudentPage.module.css";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import App from "./EditStudentModal";
import {
  setActiveStudent,
  setStudentsForCohortChat,
} from "../../redux/features/app-slice";
import { motion } from "framer-motion";
import { BsChatText } from "react-icons/bs";

//CohortFitlerTable renders the content of the table the mapping over the students information of each selected Cohort

const CohortFilterTable = ({ setCurrCohort, currCohort, clickedCohort, setClickedCohort, cohort, setChatCohort})=>{
  
  const dispatch = useDispatch();
      return (
                       <>
                        {cohort.students.map((student) => {
                          const daysToEts = getDaysToEts(student.ets_date);
                          return (
                            <motion.tr
                              whileHover={{ backgroundColor: "#F5F5F5" }}
                              className={s.tr}
                              key={student.user_id}
                              onClick={() => {
                                dispatch(setActiveStudent(student));
                                dispatch(setStudentsForCohortChat([]));
                              }}
                            >
                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.first}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.last}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <ColorEts daysToEts={daysToEts}>
                                  <td>
                                    <btn className={s.td}>{student.ets_date}</btn>
                                  </td>
                                </ColorEts>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.leave_start_date}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.branch}</btn>
                                </td>
                              </LinkToViewStudent>

                              <td>
                                <div>
                                  <App
                                    cohort_id={student.cohort_id}
                                    setClickedCohort={setClickedCohort}
                                    clickedCohort={clickedCohort}
                                    setCurrCohort={setCurrCohort}
                                    student_id={student.user_id}
                                    currCohort={currCohort}
                                  />
                                </div>
                              </td>

                              <td>
                                <button
                                  className={`${s.chatBtn} ${s.td}`}
                                  onClick={() => {
                                    dispatch(setActiveStudent(student));
                                    dispatch(setStudentsForCohortChat([]));
                                    setChatCohort(student.first +' ' + student.last.substring(0,1) + '.')
                                  }}
                                >
                                  <BsChatText />
                                </button>
                              </td>
                            </motion.tr>
                            );
                        })}
                    </> 
       )
}
export default CohortFilterTable; 

// Defines reusable function that wraps each student row elements to navigate to their student page when clicked
const LinkToViewStudent = ({ children, id }) => {
  const link = "/admin/viewstudent";
  return (
    <>
      <Link as="/admin" href={{ pathname: link, query: { id } }}>
        {children}
      </Link>
    </>
  );
};

// Function that determines color styling of ETS block based off of daysToETS and rerenders 
const ColorEts = ({ daysToEts, children }) => {
  if (daysToEts <= 0) {
    return (
      <div id={`${etsStyle.ETSd}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 0 && daysToEts <= 30) {
    return (
      <div id={`${etsStyle.ETS30}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 30 && daysToEts <= 60) {
    return (
      <div id={`${etsStyle.ETS60}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 60 && daysToEts <= 90) {
    return (
      <div id={`${etsStyle.ETS90}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else if (daysToEts > 90 && daysToEts <= 120) {
    return (
      <div id={`${etsStyle.ETS120}`} className={`${etsStyle.adminColoring}`}>
        {children}
      </div>
    );
  } else {
    return (
      <div id={`${etsStyle.ETS120}`} className={`${etsStyle.adminColoring}`}>
        120+ Days
      </div>
    );
  }
};



////  DELETE IF TABLE SORT IS FUNCTIONAL  Creates Selectors for Filtering table but unable to use with how tables are mapped. 

// const [columnFiltered, setColumnFiltered] = useState("");
// const [sortBy, setSortBy] = useState(""); 

// const handleFilterSelection = (e) => {
//     setColumnFiltered(e.target.value);
// };
// console.log(columnFiltered)

// const handleSortBy = (e) => {
//     setSortBy(e.target.value);
// };
// console.log(sortBy)
// return (
//     <div className={s.container}>
//        <select className={s.filterSelector} value ={columnFiltered} onChange={handleFilterSelection}>
//         <option className={s.columnFilter} value="placeholder">Select Column Filter</option>
//         <option className={s.columnFilter} value="first">First Name</option>
//         <option className={s.columnFilter} value="last">Last Name</option>
//         <option className={s.columnFilter} value="ets_date">ETS</option>
//         <option className={s.columnFilter} value="branch">Branch</option>
//        </select>

//         <select className={s.filterSelector} value = {sortBy} onChange={handleSortBy}>
//         <option className={s.columnFilter} value="placeholder">Sort By</option>
//         <option className={s.columnFilter} value="ASC">Ascending</option>
//         <option className={s.columnFilter} value="DESC">Descending</option>
//         </select>
//     </div>
// );