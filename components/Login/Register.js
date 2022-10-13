import {useState} from 'react'
import axios from 'axios'
import styles from "../../styles/LoginStyles.module.css"
import { useRouter } from 'next/router'



const RegisterModal = ({open, onClose}) => {
    const router = useRouter()
    const [regCode, setRegCode] = useState("")
    
    if (!open) return null; 
    const register = () =>{
        event.preventDefault();
        console.log('user input', regCode)
        if(regCode === '123'){
            console.log('code is good')
            router.push('student/editStudentModal')
            
        } else{
            console.log('code is NOT good')
        }
        

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
                id="reg code"
                type="text"
                onChange={(event) => setRegCode(event.target.value)}
                onSubmit={register}
                value={regCode}
              />
            </div>
           
            <div className={styles.registerModalCreateFormSubmit}>
              <button
                className={styles.registerModalCreateFormSubmitBtn}
                type="submit"
                onClick={() => register()}
                
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