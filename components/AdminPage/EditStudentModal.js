import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiDelete } from 'react-icons/fi'
import { BiArchiveOut} from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { motion } from 'framer-motion';



function EditStudentModal(props) {
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
                <Button variant='danger' style={{
                    marginLeft: '1rem',
                }}>DELETE  <FiDelete size={60} /></Button>
                <Button variant='success' style={{
                    marginLeft: '1rem',
                }}>Archive  <AiOutlineEdit size={60} /></Button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }
  function App() {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
       {/* DELETE BUTTON */}
       
        {/* ARCHIVE BUTTON */}
        <btn variant="primary" onClick={() => setModalShow(true)}>
         <AiOutlineEdit />
        </btn>
         
        <EditStudentModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  export default App