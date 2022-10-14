import { useRouter } from "next/router";
import style from "../../styles/viewstudent.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudentPage from "../../components/StudentPage";

//******FOR VIEWING STUDENT INFORMATION WHILE LOGGED IN AS AN ADMIN ***********/

const viewstudent = () => {
  const { activeStudent, allUsersData } = useSelector(
    ({ app: { activeStudent, allUsersData } }) => ({
      activeStudent,
      allUsersData,
    })
  );

  const handleNext = () => {
    console.log("next");
  };

  const handlePrev = () => {
    console.log("prev");
  };

  return (
    <div className={style.container}>
      <div className={style.top}>
        <button className={style.prev} onClick={handlePrev()}>
          Previous
        </button>
        <div className={style.cohort}>{activeStudent.cohort_name}</div>
        <div className={style.search}>Student Search</div>
        <button className={style.next} onClick={handleNext()}>
          Next
        </button>
      </div>
      <div className={style.card}>
        <StudentPage />
      </div>
    </div>
  );
};

export default viewstudent;
