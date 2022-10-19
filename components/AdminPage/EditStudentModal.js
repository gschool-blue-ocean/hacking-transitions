import { useEffect, useState } from 'react';
import s from '../../styles/AdminHomePage/AdminPage.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiDelete } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiArchive } from 'react-icons/bi';
import axios from 'axios';

function EditStudentModal(props) {
  const [dVisible, setDVisible] = useState(true);
  const [aVisible, setAVisible] = useState(true);
  const student_id = props.student_id;
   const handleDelete = (event) => {
      axios({
        method:'delete',
        url: `/api/users/${student_id}`,
      }).then(res => {
        let stateWithoutEditedCohort = props.currCohort.filter(cohort => cohort.cohort_id != props.cohort_id);
          //filter out the parent cohort of deleted student
        let cohortToBeEdited = props.currCohort.filter(cohort => cohort.cohort_id == props.cohort_id);
        console.log(cohortToBeEdited.cohort_id)
          //filter and find the parent cohort of deleted student
        let filteredStudents = cohortToBeEdited[0].students.filter(students => students.user_id != student_id);
         //filter out deleted student from cohort
        let newlyEditedCohort = [{
             cohort_id: parseInt(cohortToBeEdited[0].cohort_id),
             cohort_name: cohortToBeEdited[0].cohort_name,
             students: filteredStudents
        }]
           //combine the filtered students array with the data from the parent cohort
        let stateWithEditedCohort = stateWithoutEditedCohort.concat(newlyEditedCohort);
          //concat the state with the newly updated state without replacing the old state
        props.setCurrCohort(stateWithEditedCohort);
          //set the current cohort with combined state to remove student without removing state
      })
      setDVisible(false)
   }
   const handleArchive = (event) => {
    const student_id = props.student_id;
     axios({
      method: 'PATCH',
      url: `/api/users/students/${student_id}`
     }).then(res => {
      let stateWithoutEditedCohort = props.currCohort.filter(cohort => cohort.cohort_id != props.cohort_id);
        //filter out the parent cohort of deleted student
      let cohortToBeEdited = props.currCohort.filter(cohort => cohort.cohort_id == props.cohort_id);
        //filter and find the parent cohort of deleted student
      let filteredStudents = cohortToBeEdited[0].students.filter(students => students.user_id != student_id);
      //filter out deleted student from cohort
      let newlyEditedCohort = [{
          cohort_id: parseInt(cohortToBeEdited[0].cohort_id),
          cohort_name: cohortToBeEdited[0].cohort_name,
          students: filteredStudents
      }]
        //combine the filtered students array with the data from the parent cohort
      let stateWithEditedCohort = stateWithoutEditedCohort.concat(newlyEditedCohort);
        //concat the state with the newly updated state without replacing the old state
      props.setCurrCohort(stateWithEditedCohort);
        //set the current cohort with combined state to remove student without removing state
     })
     setAVisible(true)
   }
    return (
      <Modal
        {...props}
        size="s"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Delete or Archive
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div> 
              {dVisible && ( 
                <Button disabled={false} variant='danger'  style={{
                    marginLeft: '1rem',
                }}><FiDelete size={60} disabled={false} onClick={handleDelete} /></Button>
              )}
              {aVisible && (
                <Button variant='success' onClick={handleArchive} style={{
                    marginLeft: '1rem',
                }}><BiArchive size={60} /></Button>
              )}
            </div>
        </Modal.Body>
      </Modal>
    );
  }
  function App({student_id, currCohort, setCurrCohort, setClickedCohort, clickedCohort, cohort_id}) {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <btn className={s.editRow} variant="primary" onClick={() => setModalShow(true)}>
         <AiOutlineEdit />
        </btn>
         
        <EditStudentModal
          clickedCohort={clickedCohort}
          setClickedCohort={setClickedCohort}
          currCohort={currCohort}
          setCurrCohort={setCurrCohort}
          student_id={student_id}
          cohort_id={cohort_id}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  export default App