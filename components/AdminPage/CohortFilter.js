import s from "../../styles/AdminHomePage/CohortFilter.module.css";
import {useDispatch} from "react-redux";
import {useState} from "react";

const CohortFilter = ({setCurrCohort, cohorts})=>{
    const dispatch = useDispatch();
    const [columnFiltered, setColumnFiltered] = useState("");
    const [sortBy, setSortBy] = useState(""); 

    const handleFilterSelection = (e) => {
        setColumnFiltered(e.target.value);
    };
    console.log(columnFiltered)

    const handleSortBy = (e) => {
        setSortBy(e.target.value);
    };
    console.log(sortBy)
    return (
        <div className={s.container}>
           <select className={s.filterSelector} value ={columnFiltered} onChange={handleFilterSelection}>
            <option className={s.columnFilter} value="placeholder">Select Column Filter</option>
            <option className={s.columnFilter} value="first">First Name</option>
            <option className={s.columnFilter} value="last">Last Name</option>
            <option className={s.columnFilter} value="ets_date">ETS</option>
            <option className={s.columnFilter} value="branch">Branch</option>
           </select>

            <select className={s.filterSelector} value = {sortBy} onChange={handleSortBy}>
            <option className={s.columnFilter} value="placeholder">Sort By</option>
            <option className={s.columnFilter} value="ASC">Ascending</option>
            <option className={s.columnFilter} value="DESC">Descending</option>
            </select>
        </div>
    );

}

export default CohortFilter; 