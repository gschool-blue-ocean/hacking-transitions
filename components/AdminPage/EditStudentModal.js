import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiDelete } from 'react-icons/fi'
import { BiArchiveOut} from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { motion } from 'framer-motion';
import axios from 'axios';



function EditStudentModal(props) {
  const student_id = props.student_id;
   const handleDelete = (event) => {
    axios({
      method:'delete',
      url: `/api/users/${student_id}`,
    }).then(res => console.log(res))
   }
   const handleArchive = (event) => {

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
            Are you sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div> 
                <Button variant='danger' onClick={handleDelete} style={{
                    marginLeft: '1rem',
                }}>Delete  <FiDelete size={60} /></Button>
                <Button variant='success' onClick={handleArchive} style={{
                    marginLeft: '1rem',
                }}>Archive  <AiOutlineEdit size={60} /></Button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }
  function App({student_id, currCohort}) {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <btn variant="primary" onClick={() => setModalShow(true)}>
         <AiOutlineEdit />
        </btn>
         
        <EditStudentModal
          student_id={student_id}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  export default App