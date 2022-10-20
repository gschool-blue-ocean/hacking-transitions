import { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import style from "../../styles/Archive.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ArchivePage() {
  //STATES NEEDED: global=> archived(student/cohort data), local=> checked(boolean), chooseCohorts(boolean), chooseStudents(boolean)
  //const [front, setFront] = useState(true); //Tried to make cards flip (am struggling)

  const [displayCohorts, setDisplay] = useState([]);
  const [resultStudent, setResultStudent] = useState([]);

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

  //This is for the initial display of the latest 5 archived students and cohorts
  const lastFive = () => {
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

    fetch(`/api/archive/students`)
      .then((data) => {
        return data.json();
      })
      .then((recentStudents) => {
        const stu = [];
        for (let j = 0; j < 5; j++) {
          stu.push(recentStudents[j]);
        }
        setResultStudent(stu);
      });
  };

  useEffect(lastFive, []);

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
          {displayCohorts.map((e) => {
            return (
              <>
                <div
                  className={style.card}
                  onClick={() => {
                    setCohort(e.cohort_name);
                    setShow(!show);
                  }}
                >
                  <h3>{e.cohort_name}</h3>
                  <p>
                    {e.start_date}-{e.end_date}
                  </p>
                </div>
              </>
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
            {" "}
            {listStudents.length == 0 ? (
              <p>sorry no list</p>
            ) : (
              listStudents.map((e) => {
                return (
                  <li>
                    {e.first} {e.last}
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
          {resultStudent.map((e) => {
            return (
              <>
                <div className={style.card}>
                  <h3>
                    {e.first} {e.last}
                  </h3>
                  <p>Class: {e.cohort_name}</p>
                  <p>ETS Date: {e.ets_date}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
