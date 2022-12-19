import {useState} from 'react'
import styles from "../../styles/LoginStyles.module.css"
import { useRouter } from 'next/router'
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterModal = ({open, onClose}) => {
    const router = useRouter()
    const [regCode, setRegCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");


    if (!open) return null; 
    
    const register =  (event) =>{
        event.preventDefault();
         fetch("/api/registration")
        .then ((data) => {
          return data.json()
        })
        .then (
          ( data ) => {
            console.log("this is my data", data)
            data.map((passcode) => {
              // console.log(res)
                let cohortCode = passcode.register_code
                let cohort = passcode.cohort_name
                let cohortID = passcode.cohort_id
                if ( regCode == cohortCode) {
                  console.log(cohort)
                  console.log(cohortID)
                    axios.post("/api/admin", {
                      admin: false,
                      first: firstName,
                      last: lastName,
                      username: Username,
                      password: Password,
                      email: email,
                      cohort_name: cohort,
                      cohort_id: cohortID
                  });
                 window.location.reload();
                }
                
                else {

                  router.push('/registrationerror')
              }
            })
            fetch(`/api/users/${email}`)
            .then((res) => {
              if (res.status === 404) throw new Error("Not Found");
              return res.json();
            })
            .then((user) => {
              //register user in firebase
              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, Password)
                .then((userCredential) => {
                  // Signed in 
                  const currentUser = userCredential.user;
                  localStorage.setItem("currentUser", JSON.stringify(user));
                  sessionStorage.setItem("currentUser", JSON.stringify(user));
                  user.admin
                  ? (router.push("/admin"), setLoginData(""))
                  : (router.push("/student"),
                    dispatch(setActiveStudent(user)),
                    setLoginData(""));
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode,errorMessage);
                });
            })
          }
            )
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
                required
              />
            </div>

            <div className={styles.registerModalCreateFormInputLabel}>
              <label> First Name</label>
              <input
                type="text"
                placeholder='ex. "John"'
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
            </div>

            <div className={styles.registerModalCreateFormInputLabel}>
              <label> Last Name</label>
              <input
                type="text"
                placeholder='ex. "Smith"'
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>

            <div className={styles.registerModalCreateFormInputLabel}>
              <label> Email</label>
              <input
                type="text"
                placeholder='ex. "JohnSmith@gmail.com"'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              />
            </div>

            <div className={styles.registerModalCreateFormInputLabel}>
              <label> Create Username</label>
              <input
                type="text"
                placeholder='ex. "Username"'
                onChange={(event) => setUsername(event.target.value)}
                value={Username}
                required
              />
            </div>

            <div className={styles.registerModalCreateFormInputLabel}>
              <label> Create Password</label>
              <input
                type="text"
                placeholder='ex. "P@ssw0rd"'
                onChange={(event) => setPassword(event.target.value)}
                value={Password}
                required
              />
            </div>
           
            <div className={styles.registerModalCreateFormSubmit}>
              <button
                className={styles.registerModalCreateFormSubmitBtn}
                type="submit"
                onClick={(event) => register(event)}
                
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