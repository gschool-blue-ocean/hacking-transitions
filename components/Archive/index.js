import { useState, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import style from "../../styles/Archive.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import StudentPage from "../StudentPage";

export default function ArchivePage({ cohorts, students }) {
  //STATES NEEDED: global=> archived(student/cohort data), local=> checked(boolean), chooseCohorts(boolean), chooseStudents(boolean)
  //const [front, setFront] = useState(true); //Tried to make cards flip (am struggling)

  const [displayCohorts, setDisplay] = useState(cohorts);
  const [resultStudent, setResultStudent] = useState(students);

  //for setting "Active" student global state
  const dispatch = useDispatch();
  //

  //for Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [cohort, setCohort] = useState([]);
  const [listStudents, setListStudents] = useState([]);

  const getList = () => {
    fetch(`/api/archive/listStudents/${cohort}`)
      .then((data) => {
        return data.json();
      })
      .then((list) => {
        if (list.length !== 0) {
          setListStudents(list);
        } else {
          setListStudents([
            { first: "no list, sorry", last: "no list, sorry" },
          ]);
        }
      });
  };

  //

  //for Search
  const studentRef = useRef("");
  const cohortRef = useRef("");

  const searchStudent = (e) => {
    e.preventDefault();
    let search = studentRef.current.value;
    let sStu = search.split(" ");
    let data = `${sStu[0]}-${sStu[1]}`;
    console.log("student search", data);

    fetch(`/api/archive/students/${data}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => {
        if (results.length !== 0) {
          setResultStudent(results);
        } else {
          setResultStudent([
            {
              first: "No Results",
            },
          ]);
        }
      });
  };

  const searchCohort = (e) => {
    e.preventDefault();
    let search = cohortRef.current.value;
    fetch(`/api/archive/cohorts/${search}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => {
        if (results.length !== 0) {
          setDisplay(results);
        } else {
          setDisplay([
            {
              cohort_name: "No Results",
            },
          ]);
        }
      });
  };

  //

  return (
    <div>
      <div className={style.cohorts}>
        <h2>Archived Cohorts</h2>
        <form className={style.searchC}>
          <input ref={cohortRef} type="text" placeholder="Search Cohorts..." />
          <button type="submit" onClick={searchCohort}>
            <HiOutlineSearch />
          </button>
        </form>
        <div className={style.cardDeck}>
          {displayCohorts.map((cohort) => {
            return (
              <div
                key={cohort.cohort_id}
                className={style.card}
                onClick={() => {
                  setCohort(cohort.cohort_name);
                  setShow(!show);
                }}
              >
                <h3>{cohort.cohort_name}</h3>
                <p>
                  {cohort.start_date}-{cohort.end_date}
                </p>
              </div>
            );
          })}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          scrollable={true}
          onEnter={getList}
        >
          <Modal.Header closeButton>
            <Modal.Title>{cohort} student list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {listStudents.length == 0 ? (
              <p>sorry no list</p>
            ) : (
              listStudents.map((student) => {
                return (
                  <li
                    key={student.user_id}
                    onClick={() => {
                      dispatch(setActiveStudent(student));
                    }}
                  >
                    {student.first} {student.last}
                  </li>
                );
              })
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className={style.students}>
        <h2>Archived Students</h2>
        <form className={style.searchS}>
          <input
            ref={studentRef}
            type="text"
            placeholder="Search Students..."
          />
          <button type="submit" onClick={searchStudent}>
            <HiOutlineSearch />
          </button>
        </form>
        <div className={style.cardDeck}>
          {resultStudent.map((student) => {
            return (
              <div className={style.card} key={student.user_id}>
                <h3>
                  {student.first} {student.last}
                </h3>
                <p>Class: {student.cohort_name}</p>
                <p>ETS Date: {student.ets_date}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
