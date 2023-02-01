import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStudent } from "../../../redux/features/app-slice";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { FaCogs } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb"


import css from "../../../styles/StudentPage/ProfileSection.module.css";
import convertDateToIso from "./functions";

const ProfileEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));
  function handleButtonPress() {
    setIsModalOpen(true);
  }

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

  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [formData, setFormData] = useState({
    user_id: activeStudent.user_id,
    firstname: activeStudent.first,
    lastname: activeStudent.last,
    email: activeStudent.email,
    rank: activeStudent.rank,
    branch: activeStudent.branch,
    dutystation: activeStudent.duty_station,
    taps_complete: activeStudent.taps_complete,
    leavestartdate: convertDateToIso(activeStudent.leave_start_date),
    etsdate: convertDateToIso(activeStudent.ets_date),
    planning_to_relocate: activeStudent.planning_to_relocate,
    city: activeStudent.city,
    state: activeStudent.state,
    has_dependents: activeStudent.has_dependents,
    highesteducation: activeStudent.highest_education,
    seeking_further_education: activeStudent.seeking_further_education,
    mos: activeStudent.mos,
    aboutme: activeStudent.interests,
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
            <div className={css.EditPassword}>
              <div className={css.EditPasswordTitle} onClick={() => { setIsPasswordOpen(!isPasswordOpen) }}>
                {!isPasswordOpen ?
                  <>
                    <h6>Change Password:</h6>
                    <FaCogs />
                  </>
                  :
                  <>
                    <h6>Go Back</h6>
                    <TbArrowBack />
                  </>
                }
              </div>
            </div>
            {!isPasswordOpen && (
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
                      value={formData.firstname}
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
                      value={formData.lastname}
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
                      value={formData.dutystation}
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
                      value={formData.leavestartdate}
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
                      value={formData.etsdate}
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
                      value={formData.highesteducation}
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
                        placeholder="Tell us about yourself."
                        onChange={handleChange}
                        value={formData.aboutme}
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
            )}
            {isPasswordOpen && (
              <>
                <form className={css.EditPasswordForm}>
                  <section>
                    <label>Current Password:</label>
                    <input
                      type="password"
                    ></input>
                  </section>
                  <section>
                    <label>New Password:</label>
                    <input
                      type="password"
                    ></input>
                  </section>
                  <section>
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                    ></input>
                  </section>
                  <section>
                    <input
                      type="submit"
                      value="Change Password"
                    />
                    <input
                      onClick={() => { setIsPasswordOpen(false) }}
                      type="button"
                      value="Cancel"
                    />
                  </section>
                </form>
              </>
            )}
          </div>
          <div className={css.EditBackground} onClick={() => { setIsModalOpen(false), setIsPasswordOpen(false) }}></div>
        </>
      )}
    </>
  )
}
export default ProfileEdit;