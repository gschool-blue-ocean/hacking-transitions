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
import CohortFilterTable from "./CohortFilterTable";

const CohortView = ({ studentData, currCohort, setCurrCohort, setChatCohort}) => {

  const [clickedCohort, setClickedCohort] = useState([]);
   //handle click for cohort
   const handleClickedCohort = (e) => {
    const cohort_id = e.target.dataset.cohort_id;
    setClickedCohort(cohort_id);
  };


  console.log("studentData", studentData);
  
  //Create SortButton to be used for Column headers 
  const SortButton = ({ direction, id, onClick, sortBy }) => {
    const arrows = { ascending: '↓', descending: '↑' }
    const arrow = sortBy === id ? arrows[direction] : '↕︎'
    
    return (
      <div className={s.blankbutton} id={id} onClick={onClick}>
          {arrow}
          <div className={s.sortDirection}>Sort {direction}</div>
        </div>
      )
    }
    //sets student data to be used in the sortableData Table 
  //  const [studentData, setStudentData]= useState([])
    
////Need to find a way to ensure that the state is set prior to rendering
//// so that it can be accessed when rendering the table view 
//// potentially make a use effect to delay the render until currCohort is set.
let index = currCohort.map((cohort, cohortIndex) => {
return cohortIndex
})

console.log("index", index)
    //import useSortableDate on the list of students to be used in the Table
    const {items, requestSort, sortConfig } = useSortableData(currCohort[index]?.students);

    console.log("sortableData:" , currCohort)
    
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
            <h1>{cohort.cohort_name}</h1>
            <div className={s.div}>
              <table className={s.table}>
                        <tr className={s.headtr}>
                          <th>
                            First 
                            <SortButton direction={sortConfig?.direction} id={cohort.id}  onClick={()=> requestSort('first')} sortBy = {sortConfig?.key}/>
                          </th>
                          <th>
                            Last 
                            <SortButton direction={sortConfig?.direction} id="last"  onClick={()=> requestSort('last')} sortBy = {sortConfig?.key}/>
                          </th>
                          <th>
                            ETS
                          <SortButton direction={sortConfig?.direction} id="ets"  onClick={()=> requestSort('ets')} sortBy = {sortConfig?.key}/>
                          </th>

                          <th className={s.tableheaders}>Terminal</th>
                          <th>
                            Branch
                          <SortButton direction={sortConfig?.direction} id="branch"  onClick={()=> requestSort('branch')} sortBy = {sortConfig?.key}/>
                          </th>
                          <th className={s.tableheaders}>Edit</th>
                          <th className={s.tableheaders}>Chat</th>
                        </tr>
                          <CohortFilterTable  index ={cohortIndex} cohort={cohort} setClickedCohort={setClickedCohort} setCurrCohort={setCurrCohort} currCohort={currCohort} setChatCohort={setChatCohort} />
                      </table>
                      </div>
          </div>
        ))}
      </div>
    );
  } 
}

export default CohortView;

