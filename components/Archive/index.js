import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import style from "../../styles/Archive.module.css";

//goal for this component
//archive students button, puts checkboxes next to student names, can select students then push "OK"--> get message that student was archived
//archive cohort button, puts checkboxes next to cohorts, can select multiple then push "OK"--> get message that cohort is archived
//once state of "archived" should no longer display on other screens
//should have a display archived button

//now we only display the archived

//make the rows today row: archived| false until archived then PATCH request and change archived to TRUE

export default function ArchivePage() {
  //STATES NEEDED: global=> archived(student/cohort data), local=> checked(boolean), chooseCohorts(boolean), chooseStudents(boolean)
  const mcsp = {
    title: "MCSP-13",
    dates: "10/08/2010-01/01/2011",
    graduationDate: "21 OCT 22",
    total: 30,
    studentsClearing: 10,
    studentsCleared: 10,
    studentsNotClearing: 10,
    students: "long list of students",
  };

  const student = {
    first: "bob",
    last: "bird",
    cohort: "MCSP-13",
    taskTotal: 20,
    completedTasks: 15,
    tranStatus: "complete",
  };

  return (
    <div>
      {/* create a side bar with Students, Cohorts, Archived*/}

      <div className={style.cohorts}>
        <h2>Archived Cohorts</h2>
        <form className={style.searchC}>
          <input type="text" placeholder="Search Cohorts..." />
          <button type="submit">
            <HiOutlineSearch />
          </button>
        </form>
        <div className={style.cardDeck}>
          <div className={style.card}>
            <h3>{mcsp.title}</h3>
            <h4>{mcsp.total} students</h4>
            <h4>{mcsp.dates}</h4>
          </div>
          <div className={style.card}>
            <h3>
              {student.first} {student.last}
            </h3>
            <h5>{student.cohort}</h5>
          </div>
        </div>
      </div>

      <div className={style.students}>
        <h2>Archived Students</h2>
        <form className={style.searchS}>
          <input type="text" placeholder="Search Students..." />
          <button type="submit">
            <HiOutlineSearch />
          </button>
        </form>
        <div className={style.cardDeck}>
          <div className={style.card}></div>
        </div>
      </div>
    </div>
  );
}
