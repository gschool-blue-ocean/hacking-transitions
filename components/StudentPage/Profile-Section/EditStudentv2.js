import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStudent } from "../../../redux/features/app-slice";
import { FiEdit } from "react-icons/fi";

import css from "../../../styles/StudentPage/ProfileEdit.module.css";
import convertDateToIso from "./functions";

const ProfileEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));

  function handleButtonPress() {
    setIsModalOpen(true);
  }
  
  function handleCancelPress() {
    setIsModalOpen(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", formData);
    fetch(`/api/users/${activeStudent.user_id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(setActiveStudent(formData));
        router.push("/student");
      })
      .catch((err) => console.log(err));
  };
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


    return (
      <div>
        <div className="Edit" onClick={handleButtonPress}><FiEdit/></div>
      {isModalOpen && (
        <div className={css.ProfileEditBG}>
           <form className={css.addStudentForm} onSubmit={handleSubmit}>
        <div className={css.editStudentFormInputs}>
          <label className={css.label}>
            First
            <input
              id="editStudentFirstName"
              required
              className={css.answer}
              type="text"
              placeholder="Student First name"
              onChange={handleChange}
              name="first"
              value={formData.first}
            />
          </label>
          <label className={css.label}>
            Last
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student Last name"
              onChange={handleChange}
              name="last"
              value={formData.last}
            />
          </label>
          <label className={css.label}>
            Email
            <input
              required
              className={css.answer}
              type="email"
              placeholder="Student Email Address"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </label>
          <label className={css.label}>
            Rank
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student Rank"
              onChange={handleChange}
              name="rank"
              value={formData.rank}
            />
          </label>
          <label className={css.label}>
            Branch
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student Branch of Service"
              onChange={handleChange}
              name="branch"
              value={formData.branch}
            />
          </label>
          <label className={css.label}>
            Duty Station
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student Duty Station"
              onChange={handleChange}
              name="duty_station"
              value={formData.duty_station}
            />
          </label>
          <label className={css.label}>
            Leave start date
            <input
              required
              className={css.answer}
              type="date"
              onChange={handleChange}
              name="leave_start_date"
              value={formData.leave_start_date}
            />
          </label>
          <label className={css.label}>
            ETS date
            <input
              required
              className={css.answer}
              type="date"
              onChange={handleChange}
              name="ets_date"
              value={formData.ets_date}
            />
          </label>
          <label className={css.label}>
            City
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student City"
              onChange={handleChange}
              name="city"
              value={formData.city}
            />
          </label>
          <label className={css.label}>
            State
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student State"
              onChange={handleChange}
              name="state"
              value={formData.state}
            />
          </label>
          <label className={css.label}>
            Highest education
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student highest education"
              onChange={handleChange}
              name="highest_education"
              value={formData.highest_education}
            />
          </label>
          <label className={css.label}>
            Military Occupation
            <input
              required
              className={css.answer}
              type="text"
              placeholder="Student Military occupation"
              onChange={handleChange}
              name="mos"
              value={formData.mos}
            />
          </label>
        </div>
        {activeStudent.admin ? null : (
          <div className={css.myInterestsDiv}>
            <label className={css.interestLabel}>My interests:</label>
            <textarea
              className={css.editInterestsTextarea}
              type="text"
              onChange={handleChange}
              name="interests"
              value={formData.interests}
            />
          </div>
        )}
        <div className={css.editStudentBtnDiv}>
          <input
            className={css.editStudentBtn}
            type="submit"
            value="Update Student"
          />
          <input
            className={css.editStudentBtn}
            onClick={handleCancelPress}
            type="button"
            value="Cancel"
          />
        </div>
      </form>
        </div>
      )}
    </div>
    )
}
export default ProfileEdit;