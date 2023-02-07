import react, { useState } from "react";
import styles from "../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import { useRouter } from "next/router";
import axios from "axios";

const EditStudentModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));
  console.log({ activeStudent });

  const [formData, setFormData] = useState({
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
    file_va_claim: activeStudent.file_va_claim,
    hhg_move: activeStudent.hhg_move,
    barracks_checkout: activeStudent.barracks_checkout,
    final_physical: activeStudent.final_physical,
    gear_turn_in: activeStudent.gear_turn_in,
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
  ///////////////// PATCH for update student info refactored for axios /////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", formData);
    try {
        const res = await axios.patch(`/api/users/${activeStudent.user_id}`, formData);
        dispatch(setActiveStudent(formData));
        router.push("/student");
    } catch (err) {
        console.log(err);
    }
};

  console.log("activeStudent", activeStudent);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      return setFormData((prevData) => {
        return {
          ...prevData,
          [e.target.name]: e.target.checked,
        };
      });
    }

    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCancel = () => {
    router.push("/student");
  };

  return (
    <div className={styles.addStudentModal}>
      <h3 className="editStudentFormTitle">Edit student information</h3>
      <form className={styles.addStudentForm} onSubmit={handleSubmit}>
        <div className={styles.editStudentFormInputs}>
          <label className={styles.label}>
            First
            <input
              id="editStudentFirstName"
              required
              className={styles.answer}
              type="text"
              placeholder="Student First name"
              onChange={handleChange}
              name="first"
              value={formData.first}
            />
          </label>
          <label className={styles.label}>
            Last
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student Last name"
              onChange={handleChange}
              name="last"
              value={formData.last}
            />
          </label>
          <label className={styles.label}>
            Email
            <input
              required
              className={styles.answer}
              type="email"
              placeholder="Student Email Address"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </label>
          <label className={styles.label}>
            Rank
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student Rank"
              onChange={handleChange}
              name="rank"
              value={formData.rank}
            />
          </label>
          <label className={styles.label}>
            Branch
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student Branch of Service"
              onChange={handleChange}
              name="branch"
              value={formData.branch}
            />
          </label>
          <label className={styles.label}>
            Duty Station
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student Duty Station"
              onChange={handleChange}
              name="duty_station"
              value={formData.duty_station}
            />
          </label>
          <label className={styles.label}>
            Leave start date
            <input
              required
              className={styles.answer}
              type="date"
              onChange={handleChange}
              name="leave_start_date"
              value={formData.leave_start_date}
            />
          </label>
          <label className={styles.label}>
            ETS date
            <input
              required
              className={styles.answer}
              type="date"
              onChange={handleChange}
              name="ets_date"
              value={formData.ets_date}
            />
          </label>
          <label className={styles.label}>
            City
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student City"
              onChange={handleChange}
              name="city"
              value={formData.city}
            />
          </label>
          <label className={styles.label}>
            State
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student State"
              onChange={handleChange}
              name="state"
              value={formData.state}
            />
          </label>
          <label className={styles.label}>
            Highest education
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student highest education"
              onChange={handleChange}
              name="highest_education"
              value={formData.highest_education}
            />
          </label>
          <label className={styles.label}>
            Military Occupation
            <input
              required
              className={styles.answer}
              type="text"
              placeholder="Student Military occupation"
              onChange={handleChange}
              name="mos"
              value={formData.mos}
            />
          </label>
          {/* <label className={styles.studentInfoCheckbox}>
            <input
              type="checkbox"
              name="seeking_further_education"
              onChange={handleChange}
              checked={formData.seeking_further_education}
            />{" "}
            Seeking further education?
          </label>
          <label className={styles.studentInfoCheckbox}>
            <input
              type="checkbox"
              name="planning_to_relocate"
              onChange={handleChange}
              checked={formData.planning_to_relocate}
            />{" "}
            Planning to relocate?
          </label>
          <label className={styles.studentInfoCheckbox}>
            <input
              type="checkbox"
              name="taps_complete"
              onChange={handleChange}
              checked={formData.taps_complete}
            />{" "}
            Taps complete?
          </label>
          <label className={styles.studentInfoCheckbox}>
            <input
              type="checkbox"
              name="has_dependents"
              onChange={handleChange}
              checked={formData.has_dependents}
            />{" "}
            Have dependents?
          </label> */}
        </div>
        {activeStudent.admin ? null : (
          <div className={styles.myInterestsDiv}>
            <label className={styles.interestLabel}>My interests:</label>
            <textarea
              className={styles.editInterestsTextarea}
              type="text"
              onChange={handleChange}
              name="interests"
              value={formData.interests}
            />
          </div>
        )}
        <div className={styles.editStudentBtnDiv}>
          <input
            className={styles.editStudentBtn}
            type="submit"
            value="Update Student"
          />
          <input
            className={styles.editStudentBtn}
            onClick={handleCancel}
            type="button"
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default EditStudentModal;
