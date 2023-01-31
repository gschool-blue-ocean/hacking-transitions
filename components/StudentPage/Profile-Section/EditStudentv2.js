import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStudent } from "../../../redux/features/app-slice";
import { FiEdit } from "react-icons/fi";

import css from "../../../styles/StudentPage/ProfileSection.module.css";
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
    console.log(JSON.stringify(formData))
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
    <>
      <div className={css.Edit} onClick={handleButtonPress}><FiEdit /></div>
      {isModalOpen && (
        <>
          <div className={css.EditFormContainer}>
            <form className={css.EditProfileForm} onSubmit={handleSubmit}>
              <div className={css.EditProfileUpper}>
                <section>
                  <label for="firstname">First Name:</label>
                  <input
                    className={css.answer}
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="Enter First Name"
                    onChange={handleChange}
                    value={formData.first}
                  />
                </section>
                <section>
                  <label for="lastname">Last Name:</label>
                  <input
                    className={css.answer}
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Enter Last Name"
                    onChange={handleChange}
                    value={formData.last}
                  />
                </section>
                <section>
                  <label for="email">Email:</label>
                  <input
                    className={css.answer}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </section>
                <section>
                  <label for="rank">Rank:</label>
                  <select
                    className={css.answer}
                    id="rank"
                    name="rank"
                    placeholder="Enter Rank"
                    onChange={handleChange}
                    value={formData.rank}
                  >
                    <option value="E-1">E-1</option>
                    <option value="E-2">E-2</option>
                    <option value="E-3">E-3</option>
                    <option value="E-4">E-4</option>
                    <option value="E-5">E-5</option>
                    <option value="E-6">E-6</option>
                    <option value="E-7">E-7</option>
                    <option value="E-8">E-8</option>
                    <option value="E-9">E-9</option>
                    <option value="O-1">O-1</option>
                    <option value="O-2">O-2</option>
                    <option value="O-3">O-3</option>
                    <option value="O-4">O-4</option>
                    <option value="O-5">O-5</option>
                    <option value="O-6">O-6</option>
                    <option value="O-7">O-7</option>
                    <option value="O-8">O-8</option>
                    <option value="O-9">O-9</option>
                  </select>
                </section>
                <section>
                  <label >Branch:</label>
                  <select 
                    className={css.answer}
                    type="text"
                    placeholder="Student Branch of Service"
                    onChange={handleChange}
                    value={formData.branch}
                    name="branch"
                  >
                    <option value="Air Force">Air Force</option>
                    <option value="Army">Army</option>
                    <option value="Marine Corps">Marine Corps</option>
                    <option value="Coast Guard">Coast Guard</option>
                    <option value="Space Force">Space Force</option>
                    <option value="Navy">Navy</option>
                  </select>
                </section>
                <section>
                  <label for="dutystation">Duty Station:</label>
                  <input
                    className={css.answer}
                    id="dutystation"
                    name="dutystation"
                    type="text"
                    placeholder="Enter Duty Station"
                    onChange={handleChange}
                    value={formData.duty_station}
                  />
                </section>
                <section>
                  <label for="leavestartdate">Leave Start Date:</label>
                  <input
                    className={css.answer}
                    id="leavestartdate"
                    name="leavestartdate"
                    type="date"
                    onChange={handleChange}
                    value={formData.leave_start_date}
                  />
                </section>
                <section>
                  <label for="etsdate">ETS Date:</label>
                  <input
                    className={css.answer}
                    id="etsdate"
                    name="etsdate"
                    type="date"
                    onChange={handleChange}
                    value={formData.ets_date}
                  />
                </section>
                <section>
                  <label for="city">City:</label>
                  <input
                    className={css.answer}
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter City"
                    onChange={handleChange}
                    value={formData.city}
                  />
                </section>
                <section>
                  <label for="state">State:</label>
                  <input
                    className={css.answer}
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Enter State"
                    onChange={handleChange}
                    value={formData.state}
                  />
                </section>
                <section>
                  <label for="highesteducation">Highest Education:</label>
                  <input
                    className={css.answer}
                    id="highesteducation"
                    name="highesteducation"
                    type="text"
                    placeholder="Enter Highest Ed."
                    onChange={handleChange}
                    value={formData.highest_education}
                  />
                </section>
                <section>
                  <label for="mos">Military Occupation:</label>
                  <input
                    className={css.answer}
                    id="mos"
                    name="mos"
                    type="text"
                    placeholder="Enter Military Occupation"
                    onChange={handleChange}
                    value={formData.mos}
                  />
                </section>
                {activeStudent.admin ? null : (
                  <section>
                    <label for="aboutme">About Me:</label>
                    <textarea
                      className={css.editInterestsTextarea}
                      id="aboutme"
                      name="aboutme"
                      type="text"
                      onChange={handleChange}
                      value={formData.interests}
                      rows="4"
                      cols="50"
                    />
                  </section>
                )}
              </div>
              <div className={css.EditProfileLower}>
                <section>
                  <input
                    className={css.editStudentBtn}
                    type="submit"
                    value="Update Profile"
                  />
                  <input
                    className={css.editStudentBtn}
                    onClick={() => { setIsModalOpen(false) }}
                    type="button"
                    value="Cancel"
                  />
                </section>
              </div>
            </form>
          </div>
          <div className={css.EditBackground} onClick={()=>{setIsModalOpen(false)}}></div>
        </>
      )}
    </>
  )
}
export default ProfileEdit;