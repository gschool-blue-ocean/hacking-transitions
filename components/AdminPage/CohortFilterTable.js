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

const CohortFilterTable = ({setCurrCohort, currCohort, clickedCohort, setClickedCohort})=>{
  const dispatch = useDispatch();
  //console.log("filterTable:", currCohort);
  
   //handle click for cohort
   const handleClickedCohort = (e) => {
    const cohort_id = e.target.dataset.cohort_id;
    setClickedCohort(cohort_id);
  };

    console.log("sortableData:" , currCohort)

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

    //import useSortableDate on the list of students to be used in the Table
    const {items, requestSort, sortConfig } = useSortableData(currCohort[0].students);
 
      return (
        <div className={s.container}>
        {currCohort.map((cohort) => (
          <div key={cohort.cohort_id}>
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
                        {cohort.students.map((student, index) => {
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
                              <LinkToViewStudent id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.first}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.last}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent id={cohort.cohort_id}>
                                <ColorEts daysToEts={daysToEts}>
                                  <td>
                                    <btn className={s.td}>{student.ets_date}</btn>
                                  </td>
                                </ColorEts>
                              </LinkToViewStudent>

                              <LinkToViewStudent id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.leave_start_date}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent id={cohort.cohort_id}>
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
                      </table>
                      </div>
          </div>
        ))}
      </div>
    );
  } 
  
export default CohortFilterTable; 

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