import react, { useState } from "react";
import styles from "../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentUser,
  setActiveStudent,
} from "../../redux/features/app-slice";
const SPChecklist = () => {
  const dispatch = useDispatch();
  const { userData, activeStudent } = useSelector(
    ({ app: { currentUser, activeStudent } }) => ({
      userData: currentUser,
      activeStudent,
    })
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", checklistData);
    fetch(`/api/users/${checklistData.user_id}`, {
      method: "PATCH",
      body: JSON.stringify(checklistData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(setActiveStudent(checklistData));
      })
      .catch((err) => console.log(err));
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

  return (
    <div className={styles.SDashChecklist}>
      <div className={styles.infoCardcontainer}>
        <h4 className="editStudentFormTitle">Transition Checklist</h4>

        <div className="addStudentForm" onSubmit={handleSubmit}>
          <div className="editStudentFormInputs">
            <label className="checkboxLabel">
              <input
                id="1"
                checked={checklistData.final_physical}
                type="checkbox"
                name="final_physical"
                onChange={handleChange}
              />{" "}
              Seperation Physical Complete?
            </label>
            <label className="checkboxLabel">
              <input
                id="2"
                checked={checklistData.gear_turn_in}
                type="checkbox"
                name="gear_turn_in"
                onChange={handleChange}
              />{" "}
              Final Gear Turn-In?
            </label>
            <label className="checkboxLabel">
              <input
                id="3"
                checked={checklistData.hhg_move}
                type="checkbox"
                name="hhg_move"
                onChange={handleChange}
              />{" "}
              HHG move?
            </label>
            <label className="checkboxLabel">
              <input
                id="4"
                checked={checklistData.barracks_checkout}
                type="checkbox"
                name="barracks_checkout"
                onChange={handleChange}
              />{" "}
              Barracks Checkout?
            </label>
            <label className="checkboxLabel">
              <input
                id="5"
                checked={checklistData.file_va_claim}
                type="checkbox"
                name="file_va_claim"
                onChange={handleChange}
                // checked={checklistData.file_VA_claim}
              />{" "}
              VA Claim Filed?
            </label>
          </div>
          <input
            id="6"
            className="addStudentFormButton createStudent"
            onClick={handleSubmit}
            type="submit"
            value="Update Student"
          />
          <input
            id="7"
            className="addStudentFormButton cancel"
            onClick={handleCancel}
            type="button"
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default SPChecklist;
