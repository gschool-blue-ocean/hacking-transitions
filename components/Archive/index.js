import { useState, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import style from "../../styles/Archive.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import StudentPage from "../StudentPage";
import axios from "axios";

export default function ArchivePage({ cohorts, students }) {
  const [displayCohorts, setDisplay] = useState(cohorts);
  const [resultStudent, setResultStudent] = useState(students);

  //for setting "Active" student global state and displaying "student page"
  const dispatch = useDispatch();
  const [showStudentPage, setSP] = useState(false);

  const handleCloseSP = () => setSP(false);
  //

  //for Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [cohort, setCohort] = useState([]);
  const [listStudents, setListStudents] = useState([]);

  const getList = async () => {
    try {
      const { data } = await axios.get(`/api/archive/listStudents/${cohort}`);
      if (data.length !== 0) {
        setListStudents(data);
      } else {
        setListStudents([
          { first: "No Student Rosters Available" },
          // { first: "no list, sorry", last: "no list, sorry" },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //for Search
  const studentRef = useRef("");
  const cohortRef = useRef("");

  const searchStudent = async (e) => {
    e.preventDefault();
    let search = studentRef.current.value;
    let sStu = search.split(" ");
    let data = `${sStu[0]}-${sStu[1]}`;
    console.log("student search", data);

    try {
      const { data: results } = await axios.get(
        `/api/archive/students/${data}`
      );
      if (results.length !== 0) {
        setResultStudent(results);
      } else {
        setResultStudent([
          {
            first: "No Results",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCohort = async (e) => {
    e.preventDefault();
    let search = cohortRef.current.value;
    try {
      let res = await axios.get(`/api/archive/cohorts/${search}`);
      let results = res.data;
      if (results.length !== 0) {
        setDisplay(results);
      } else {
        setDisplay([
          {
            cohort_name: "No Results",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
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
            <Modal.Title>{cohort} Student Roster</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {listStudents.length == 0 ? (
              <p> No Roster Available </p>
            ) : (
              listStudents.map((student) => {
                return (
                  <li
                    className={style.listName}
                    key={student.user_id}
                    onClick={() => {
                      dispatch(setActiveStudent(student));
                      setSP(true);
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
      <Modal
        size="xl"
        show={showStudentPage}
        onHide={handleCloseSP}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Student Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSP}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
              <div
                className={style.card}
                key={student.user_id}
                onClick={() => {
                  dispatch(setActiveStudent(student));
                  setSP(true);
                }}
              >
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
