import react, { useState } from "react";
import styles from "../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import { Alert } from "react-bootstrap";
import axios from "axios";

const SPChecklist = () => {
  const dispatch = useDispatch();
  const activeStudent = useSelector(
    ({ app: { activeStudent } }) => activeStudent
  );

  const [checklistData, setChecklistData] = useState({
    user_id: activeStudent.user_id,
    first: activeStudent.first,
    last: activeStudent.last,
    email: activeStudent.email,
    rank: activeStudent.rank,
    branch: activeStudent.branch,
    duty_station: activeStudent.duty_station,
    taps_complete: activeStudent.taps_complete,
    leave_start_date: convertDateToIso(activeStudent.leave_start_date),
    ets_date: convertDateToIso(activeStudent.ets_date),
    planning_to_relocate: activeStudent.planning_to_relocate,
    city: activeStudent.city,
    state: activeStudent.state,
    has_dependents: activeStudent.has_dependents,
    highest_education: activeStudent.highest_education,
    seeking_further_education: activeStudent.seeking_further_education,
    mos: activeStudent.mos,
    interests: activeStudent.interests,
    final_physical: activeStudent.final_physical,
    gear_turn_in: activeStudent.gear_turn_in,
    hhg_move: activeStudent.hhg_move,
    barracks_checkout: activeStudent.barracks_checkout,
    file_va_claim: activeStudent.file_va_claim,
  });
  const [message, setMessage] = useState("")

  function convertDateToIso(date) {
    if (date == "") {
      return "";
    }
    if (date == null) {
      return "";
    } else if (date.split("-")[0].length === 4) {
      return date;
    } else if (date.split("/")[0].length === 4) {
      return date;
    } else {
      let newDate = new Date(date);
      let dateArray = newDate.toLocaleDateString().split("/");
      let year = dateArray[2];
      let day = dateArray[1].length === 2 ? dateArray[1] : `0${dateArray[1]}`;
      let month = dateArray[0].length === 2 ? dateArray[0] : `0${dateArray[0]}`;

      return `${year}-${month}-${day}`;
    }
  }

  const handleCancel = () => {
    console.log("canceled", checklistData);
  };

  ////////////////// PATCH request for update checklist refactored to use axios //////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", checklistData);
    try {
        const res = await axios.patch(`/api/users/${checklistData.user_id}`, checklistData);
        dispatch(setActiveStudent(checklistData));
        setMessage("Success!");
        setTimeout(() => {
            setMessage("");
        }, 1000);
    } catch (err) {
        console.log(err);
    }
};

  const handleChange = (e) => {
    console.log("changed");
    if (e.target.type === "checkbox") {
      return setChecklistData((prevData) => {
        return {
          ...prevData,
          [e.target.name]: e.target.checked,
        };
      });
    }
  };

  const checklistItems = (checklistData) => {
    let keys = [];
    for(let key in checklistData) {      
      // console.log(checklistData[key] === true);
      if (checklistData[key] === true || checklistData[key] === false){
        keys.push(key);
      }
    }
    // console.log(keys.length)
  }

  checklistItems(checklistData);

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

const checkStyle = {
  accentColor: 'rgb(0, 140, 128)'
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
          <label className="checkboxLabel">
            <input
              className="checkbox"
              id="1"
              checked={checklistData.final_physical}
              type="checkbox"
              name="final_physical"
              style={checkStyle}
              onChange={handleChange}
            />{" "}
            Seperation Physical Complete?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="2"
              checked={checklistData.gear_turn_in}
              type="checkbox"
              name="gear_turn_in"
              style={checkStyle}
              onChange={handleChange}
            />{" "}
            Final Gear Turn-In?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="3"
              checked={checklistData.hhg_move}
              type="checkbox"
              name="hhg_move"
              style={checkStyle}
              onChange={handleChange}
            />{" "}
            HHG move?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="4"
              checked={checklistData.barracks_checkout}
              type="checkbox"
              name="barracks_checkout"
              style={checkStyle}
              onChange={handleChange}
            />{" "}
            Barracks Checkout?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="5"
              checked={checklistData.file_va_claim}
              type="checkbox"
              name="file_va_claim"
              style={checkStyle}
              onChange={handleChange}
            />{" "}
            VA Claim Filed?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="6"
              type="checkbox"
              name="seeking_further_education"
              style={checkStyle}
              onChange={handleChange}
              checked={checklistData.seeking_further_education}
            />{" "}
            Seeking further education?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="7"
              type="checkbox"
              name="planning_to_relocate"
              style={checkStyle}
              onChange={handleChange}
              checked={checklistData.planning_to_relocate}
            />{" "}
            Planning to relocate?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="8"
              type="checkbox"
              name="taps_complete"
              style={checkStyle}
              onChange={handleChange}
              checked={checklistData.taps_complete}
            />{" "}
            Taps complete?
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className="checkbox"
              id="9"
              type="checkbox"
              name="has_dependents"
              style={checkStyle}
              onChange={handleChange}
              checked={checklistData.has_dependents}
            />{" "}
            Have dependents?
          </label>
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
