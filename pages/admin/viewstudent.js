import { useRouter } from "next/router";
import style from "../../styles/viewstudent.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudentPage from "../../components/StudentPage";

//******FOR VIEWING STUDENT INFORMATION WHILE LOGGED IN AS AN ADMIN ***********/

const viewstudent = () => {
  // grab the object of the student that you are interacting with
  let id = useRouter().query.user_id;
  const { allUsersData } = useSelector(({ app: { allUsersData } }) => ({
    allUsersData,
  }));
  let student = allUsersData[id];
  console.log(student);

  //some functions to determine what to render based off students data
  const relocation = (student) =>
    student.relocate_to_country
      ? `${student.relocate_city}, ${student.relocate_state}`
      : "N/A";

  const leave = (student) =>
    student.leave_start_date ? student.leave_start_date : "N/A";

  const dependents = (student) => (student.has_dependents ? "Yes" : "No");

  return (
    <div className={style.container}>
      <div className={style.top}>
        <button className={style.prev}>Previous</button>
        <div className={style.cohort}>{student.cohort_name}</div>
        <div className={style.search}>Student Search</div>
        <button className={style.next}>Next</button>
      </div>
      <StudentPage />
      {/* <div className={style.bottom}>
        <div className={style.card}>
          <div className={style.heading}>
            <div className={style.pic}>IN</div>
            <div
              className={style.name}
            >{`${student.first} ${student.last}`}</div>
            <div className={style.status}>30 Days</div>
          </div>
          <div className={style.data}></div>
          <div className={style.personalInfo}>
            <h3 className={style.title}>Personal Information</h3>
            <div className={style.datapoint}>Email: {student.email}</div>
            <div className={style.datapoint}>MOS: {student.mos}</div>
            <div className={style.datapoint}>Rank: {student.rank}</div>
            <div className={style.datapoint}>
              Duty Station: {student.duty_station}
            </div>
            <div className={style.datapoint}>
              Relocation: {relocation(student)}
            </div>
            <div className={style.datapoint}>
              Terminal Leave: {leave(student)}
            </div>
            <div className={style.datapoint}>
              Dependents: {dependents(student)}
            </div>
            <div className={style.datapoint}>
              Education: {student.highest_education}
            </div>
          </div>
          <div className={style.task}>
            <h3 className={style.title}>Task Status</h3>
            <div className={style.taskpoint}>Task 1: Complete</div>
            <div className={style.taskpoint}>Task 2: Complete</div>
            <div className={style.taskpoint}>Task 3: Behind</div>
            <div className={style.taskpoint}>Task 4: In Progress</div>
            <div className={style.taskpoint}>Task 5: In Progress</div>
            <div className={style.taskpoint}>Task 6: Not Started</div>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default viewstudent;
