import s from "../../styles/AdminHomePage/CohortFilterTitle.module.css";
import { useSortableData } from "../../utility";
import Link from "next/link";
import etsStyle from "../../styles/StudentPage.module.css";
import {useState} from "react";
import CohortFilterTable from "./CohortFilterTable";
import { AiFillCaretDown } from "react-icons/ai";

//CohortFilterTitle renders the headers of each individual Cohort Table based off of the index of the selected Cohort from the CohortMenu
// On-click event for First, Last, and Branch are set to requestSort() which allows to sort the table contents by column ASC/DESC

const CohortFilterTitle = ({index, currCohort, clickedCohort, setClickedCohort, cohort, setChatCohort, setCurrCohort}) => { 

    console.log("cohort", cohort);

    //Create SortButton to be used for Column headers 
    const SortButton = ({ direction, id, onClick, sortBy }) => {
        // const arrows = { ascending: '↓', descending: '↑' }
        // const arrow = sortBy === id ? arrows[direction] : '↕︎'
        
        const arrows = { ascending: <AiFillCaretDown />, descending: <AiFillCaretDown/> }
        const arrow = sortBy === id ? arrows[direction] : <AiFillCaretDown/>
        return (
      <div className={s.sortButton}>     
        <div className={s.blankButton} id={id} onClick={onClick}>{arrow}</div> 
        {/* <div className={s.sortDirection}> Sort {direction}</div> */}
      </div> 
      )
    }

  //import useSortableDate (a custom hook defined in the Utiliy file) on the list of students to be used in the Table 
  const {items, requestSort, sortConfig } = useSortableData(currCohort[index]?.students);

return (
    <>
        <table className={s.table}>
            <tr className={s.headtr}>
                <th className={s.tableheaders}>
                    {/* <SortButton direction={sortConfig?.direction} id="first"  onClick={()=> requestSort('first')} sortBy = {sortConfig?.key}/>
                    <p>&nbsp;</p> */}
                    <h1 className={s.title} id="firstTitle"> First </h1>
                </th>
                <th className={s.tableheaders}>
                    {/* <SortButton direction={sortConfig?.direction} id="last"  onClick={()=> requestSort('last')} sortBy = {sortConfig?.key}/>
                    <p>&nbsp;</p> */}
                   <h1 className={s.title}>Last</h1>  
                </th>
                <th className={s.tableheaders}>
                    {/* <SortButton direction={sortConfig?.direction} id="ets_date"  onClick={()=> requestSort('ets_date')} sortBy = {sortConfig?.key}/>
                    <p>&nbsp;</p> */}
                    <h1 className={s.title}>ETS</h1>
                </th>
                <th className={s.tableheaders}>
                {/* <SortButton  direction={sortConfig?.direction} id="branch"  onClick={()=> requestSort('leave_start_date')} sortBy = {sortConfig?.key}/>                  
                    <p>&nbsp;</p> */}
                    <h1 className={s.title}>Leave </h1>
                </th>
                <th className={s.tableheaders}>
                {/* <SortButton direction={sortConfig?.direction} id="branch"  onClick={()=> requestSort('branch')} sortBy = {sortConfig?.key}/>                  
                <p>&nbsp;&nbsp;</p> */}
                 <h1 className={s.title}>Branch</h1>
                </th>
                <th className={s.tableheaders}>
                    <h1 className={s.title}>Edit</h1>
                </th>
                <th className={s.tableheaders}>
                    <h1 className={s.title}>Chat </h1>
                </th>
            </tr>
            <CohortFilterTable  index = {index} cohort={cohort} setClickedCohort={setClickedCohort} setCurrCohort={setCurrCohort} currCohort={currCohort} setChatCohort={setChatCohort} />
        </table>
    </>
    )
}

export default CohortFilterTitle; 