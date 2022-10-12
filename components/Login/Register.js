import useState from 'react'
import axios from 'axios'
import styles from "../../styles/LoginStyles.module.css"

const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transfrom: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: 1000,
  };

const RegisterModal = ({open, onClose}) => {
    if (!open) return null; 
    const register = (event) =>{
        event.preventDefault();

    }
  return (
    <>
    <div className={styles.registerModalCreateOverlay}></div>
    <div className={styles.registerModalCreateModal}>
      <div className={styles.registerModalCreateParent}>
        <div className={styles.registerModalCreateHeader}>
          <h1>Enter Registration Code</h1>
          
        </div>
        <div className={styles.registerModalCreateForm}>
          <form>
            <div className={styles.registerModalCreateFormInputLabel}>
              <input
                className={styles.registerModalCreateFormInput}
                id="FirstName"
                type="text"
                onChange={(event) => console.log('clicked')}
              />
            </div>
           
            <div className={styles.registerModalCreateFormSubmit}>
              <button
                className={styles.registerModalCreateFormSubmitBtn}
                type="submit"
                onClick={() => console.log('test')}
              >
                Submit
              </button>
              <button onClick={onClose} className={styles.registerModalCloseBtn}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default RegisterModal