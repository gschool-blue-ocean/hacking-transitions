import s from "../../styles/AdminHomePage/CohortFilterTitle.module.css";
import { useSortableData } from "../../utility";
import Link from "next/link";
import etsStyle from "../../styles/StudentPage.module.css";
import {useState} from "react";
import CohortFilterTable from "./CohortFilterTable";


const CohortFilterTitle = ({index, currCohort, clickedCohort, setClickedCohort, cohort, setChatCohort, setCurrCohort}) => { 


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
  const {items, requestSort, sortConfig } = useSortableData(currCohort[index]?.students);

return (
    <>
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
                <th className={s.tableheaders}>
                    Terminal
                </th>
                <th>
                    Branch
                    <SortButton direction={sortConfig?.direction} id="branch"  onClick={()=> requestSort('branch')} sortBy = {sortConfig?.key}/>
                </th>
                <th className={s.tableheaders}>
                    Edit
                </th>
                <th className={s.tableheaders}>
                    Chat 
                </th>
            </tr>
            <CohortFilterTable  index = {index} cohort={cohort} setClickedCohort={setClickedCohort} setCurrCohort={setCurrCohort} currCohort={currCohort} setChatCohort={setChatCohort} />
        </table>
    </>
    )
}

export default CohortFilterTitle; 