import react, { useState, useEffect } from "react";
import styles from "../../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStudent } from "../../../redux/features/app-slice";
import { Alert } from "react-bootstrap";
import axios from "axios";
import ListItems from "./ListItems";


const SPChecklist = () => {
  const dispatch = useDispatch();
  const activeStudent = useSelector(
    ({ app: { activeStudent } }) => activeStudent
  );
  const [checklistData, setChecklistData] = useState(activeStudent);
  const [listItems, setListItems] = useState([])
  const [message, setMessage] = useState("")
  const props = {
    checklistData,
    setChecklistData,
    activeStudent,
    setActiveStudent,
    message,
    setMessage
  }

  // function convertDateToIso(date) {
  //   if (date == "") {
  //     return "";
  //   }
  //   if (date == null) {
  //     return "";
  //   } else if (date.split("-")[0].length === 4) {
  //     return date;
  //   } else if (date.split("/")[0].length === 4) {
  //     return date;
  //   } else {
  //     let newDate = new Date(date);
  //     let dateArray = newDate.toLocaleDateString().split("/");
  //     let year = dateArray[2];
  //     let day = dateArray[1].length === 2 ? dateArray[1] : `0${dateArray[1]}`;
  //     let month = dateArray[0].length === 2 ? dateArray[0] : `0${dateArray[0]}`;

  //     return `${year}-${month}-${day}`;
  //   }
  // }

  // ========== PATCH request for update checklist =============

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", checklistData);
    try {
        await axios.patch(`/api/users/${checklistData.user_id}`, checklistData);
        dispatch(setActiveStudent(checklistData));
        setMessage("Success!");
        setTimeout(() => {
            setMessage("");
        }, 1000);
    } catch (err) {
        setMessage(err);
    }
};

  const checklistItems = (checklistData) => {
    const transitionChecklistItems = [];
    for (let key in checklistData) {
      if (typeof checklistData[key] === 'boolean') {
        if (key !== 'relocate_to_country' && key !== 'admin' && key !== 'new_user' && key !== 'archived'){
          let index = [];
          index.push(key);
          index.push(checklistData[key])
          transitionChecklistItems.push(index)
        }      
      }
    }
    return transitionChecklistItems;
  };
  
  
    useEffect(() => {
        const list = checklistItems(checklistData);
        setListItems(list);
    }, [checklistData])
console.log('here', listItems)

  // const checklistItems = (checklistData) => {
  //   let keys = [];
  //   for(let key in checklistData) {      
  //     // console.log(checklistData[key] === true);
  //     if (checklistData[key] === true || checklistData[key] === false){
  //       keys.push(key);
  //     }
  //   }
  //   // console.log(keys.length)
  // }

  // checklistItems(checklistData);

  // ============ Progress Bar ============= //

  const getCheckedPercent = (checklistData) => {
    let checkArr = [ 
      checklistData.final_physical, 
      checklistData.gear_turn_in,
      checklistData.hhg_move,
      checklistData.barracks_checkout,
      checklistData.file_va_claim,
      checklistData.seeking_further_education,
      checklistData.planning_to_relocate,
      checklistData.taps_complete,
      checklistData.has_dependents
    ]
    let total = checkArr.length
    let trues = checkArr.filter(value => !!value).length
    let percent = Math.floor((trues/total)*100);
    let remaining = total - trues
    console.log([percent, remaining])
    return percent;
  }
getCheckedPercent(checklistData);
const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  textAlign: 'right',
  width: '82%',
  backgroundColor: "#e0e0de",
  borderRadius: '10px',
  marginBottom: 20,
  overflow: 'hidden',
}

const fillerStyles = {
    height: '100%',
    width: `${getCheckedPercent(checklistData)}%`,
    backgroundColor: 'rgb(0, 140, 128)',
    transition: 'width 1s ease-in-out',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    overflow: 'hidden',
  }

const labelStyles = {
  marginLeft: '.3rem',
  marginRight: '.3rem',
  color: 'white',
}

const formStyles = {
  marginBottom: 0,
}

  return (
    <div className={styles.SDashChecklist}>
      
      <div className="undefined">
        <h4 className="editStudentFormTitle" style={formStyles}>Transition Checklist</h4>
      </div>
      <div className="progress-tracker" style={containerStyles}>
        <div style={fillerStyles}>
        <span style={labelStyles}>{`${getCheckedPercent(checklistData)}%`}</span>
        </div>      
      
      </div>
      <div className={styles.checklistForm} onSubmit={handleSubmit}>
        <div className={styles.editStudentChecklist}>
        {listItems.map(item => 
          <ListItems key={item.id} {...item} props={props}/>
        )}
        </div>
        <div className={styles.checklistButtonDiv}>
          <input
            id="6"
            className={styles.checklistButtons}
            onClick={handleSubmit}
            type="submit"
            value="Update Checklist"
          />
          {/* <input
            id="7"
            className={styles.checklistButtons}
            onClick={handleCancel}
            type="button"
            value="Cancel"
          /> */}
        </div>
      </div>
      {message && (
          <Alert
            variant="primary"
            style={{
              background: 'none',
              border: 'none',
              textAlign: "center",
            }}
          >
            {message}
          </Alert>
        )}
    </div>
  );
};

export default SPChecklist;
