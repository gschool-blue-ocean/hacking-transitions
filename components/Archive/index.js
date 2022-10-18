import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import style from "../../styles/Archive.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ArchivePage() {
  //STATES NEEDED: global=> archived(student/cohort data), local=> checked(boolean), chooseCohorts(boolean), chooseStudents(boolean)
  //const [front, setFront] = useState(true); //Tried to make cards flip (am struggling)

  //for Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  //for Search
  const [searchStudent, setStudent] = useState("");
  const [searchCohort, setCohort] = useState("");
  //

  const [displayCohorts, setDisplay] = useState([]);

  function lastFive() {
    fetch(`/api/archive/cohorts`)
      .then((data) => {
        return data.json();
      })
      .then((recentArchived) => {
        const saved = [];
        for (let i = 0; i < 5; i++) {
          saved.push(recentArchived[i]);
        }
        setDisplay(saved);
      });
  }

  lastFive();

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
                <div className={style.card} onClick={handleShow}>
                  <h3>{e.cohort_name}</h3>
                  <p>
                    {e.start_date}-{e.start_date}
                  </p>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{e.title} student list</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Here will be a list of students</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
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
        <div className={style.cardDeck}>
          <div className={style.card}>
            <h3>
              {student.first} {student.last}
            </h3>
            <p>Class: {student.cohort}</p>
            <p>Transition: {student.tranStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
