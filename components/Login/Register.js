import {useState} from 'react'
import styles from "../../styles/LoginStyles.module.css"
import { useRouter } from 'next/router'




const RegisterModal = ({open, onClose}) => {
    const router = useRouter()
    const [regCode, setRegCode] = useState("");
    const [email, setEmail] = useState("");
    
    if (!open) return null; 
    
    const register = () =>{
        event.preventDefault();
      fetch(`/api/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({regCode}),
      })
        .then((res) => {
          
          if (res.status === 404) {
            console.log(res)
            console.log('code is NOT good');
          };
          return res.json();
        })
          .then(()=> {
            console.log('code is good')
            router.push('student/editStudentModal2')
            
        })
        
    }
  return (
    <>
    <div className={styles.registerModalCreateOverlay}></div>
    <div className={styles.registerModalCreateModal}>
      <div className={styles.registerModalCreateParent}>
        <div className={styles.registerModalCreateHeader}>
          <h1 className={styles.modalHeader}>Sign Up</h1>
          
        </div>
        <div className={styles.registerModalCreateForm}>
          <form>
            <div className={styles.registerModalCreateFormInputLabel}>
              <input
                className={styles.registerModalCreateFormInput}
                id="reg code"
                type="text"
                placeholder='Registration Code'
                onChange={(event) => setRegCode(event.target.value)}
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