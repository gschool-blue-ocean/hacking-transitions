import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import style from "../../styles/Archive.module.css";

export default function ArchivePage() {
  //STATES NEEDED: global=> archived(student/cohort data), local=> checked(boolean), chooseCohorts(boolean), chooseStudents(boolean)
  const [front, setFront] = useState(true);
  const [displayCohorts, setDisplay] = useState([
    {
      title: "MCSP-13",
      dates: "10/08/2010-01/01/2011",
      graduationDate: "21 OCT 22",
      total: 30,
      studentsClearing: 10,
      studentsCleared: 10,
      studentsNotClearing: 10,
      students: "long list of students",
    },
    {
      title: "MCSP-13",
      dates: "10/08/2010-01/01/2011",
      graduationDate: "21 OCT 22",
      total: 30,
      studentsClearing: 10,
      studentsCleared: 10,
      studentsNotClearing: 10,
      students: "long list of students",
    },
    {
      title: "MCSP-13",
      dates: "10/08/2010-01/01/2011",
      graduationDate: "21 OCT 22",
      total: 30,
      studentsClearing: 10,
      studentsCleared: 10,
      studentsNotClearing: 10,
      students: "long list of students",
    },
    {
      title: "MCSP-13",
      dates: "10/08/2010-01/01/2011",
      graduationDate: "21 OCT 22",
      total: 30,
      studentsClearing: 10,
      studentsCleared: 10,
      studentsNotClearing: 10,
      students: "long list of students",
    },
    {
      title: "MCSP-13",
      dates: "10/08/2010-01/01/2011",
      graduationDate: "21 OCT 22",
      total: 30,
      studentsClearing: 10,
      studentsCleared: 10,
      studentsNotClearing: 10,
      students: "long list of students",
    },
  ]);

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
          {displayCohorts.map((e) => {
            return (
              <>
                <div className={style.card}>
                  <h3>{e.title}</h3>
                  <p>{e.total} students</p>
                  <p>{e.dates}</p>
                </div>

                {/* <div className={style.card}>
                  <h3>List of Students</h3>
                  <h4>Students cleared: {e.studentsCleared}</h4>
                </div> */}
              </>
            );
          })}
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
        <div className={style.cardDeck}></div>
      </div>
    </div>
  );
}
