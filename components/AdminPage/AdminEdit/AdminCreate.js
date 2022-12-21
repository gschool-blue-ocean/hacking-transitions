import styles from "../../../styles/Edit.Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
//pull in the firebase config file with the assigned api keys for our app 
const config = require('../../Login/config');
const firebaseConfig = {
  apiKey: config.REACT_APP_APIKEY,
  authDomain: config.REACT_APP_AUTHDOMAIN,
  projectId: config.REACT_APP_PROJECTID,
  storageBucket: config.REACT_APP_STORAGEBUCKET,
  messagingSenderId: config.REACT_APP_MESSAGINGSENDERID,
  appId: config.REACT_APP_APPID,
  measurementId: config.REACT_APP_MEASUREMENTID,
};


const AdminCreate = ({ open, onClose }) => {
  const app = initializeApp(firebaseConfig);
  //auth links any user info sent to firebass api correlated with this app
  const auth = getAuth(app);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const router = useRouter();

  const resetStateOnClose = () => {
    setNewEmail("");
    setNewFirstName("");
    setNewLastName("");
    setNewPassword("");
    setNewUsername("");
  };

  const createAdmin = (event) => {
    event.preventDefault();
    console.log("New First Name: ", newFirstName)
    axios.post("/api/admin", {
      admin: true,
      first: newFirstName,
      last: newLastName,
      username: newUsername,
      // password: newPassword, password no longer stored in our database
      email: newEmail,
      cohort_name: null,
      cohort_id: null
    })
    .then(() => {
      createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((userCredential) => {
      // Signed in, automatic due to the firebase function 
      const user = userCredential.user;
      console.log('Successfully created admin: ', user);
        signOut(auth).then(() => {
          // Sign-out successful.
          alert('New Admin account created for email ', newEmail);
          //resetting text box inputs to give appearance of refresh
          resetStateOnClose();
        }).catch((error) => {
          console.log(error)
        });
      })
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    });
    
    router.push("/admin/edit");
    // window.location.reload();
  };
  return (
    open && (
      <>
        <div className={styles.adminCreateOverlay}></div>
        <div className={styles.adminCreateModal}>
          <div className={styles.adminCreateParent}>
            <div className={styles.adminCreateHeader}>
              <div className={styles.adminCreateHeaderText}>
                <h1>Create Admin</h1>
              </div>
              <div className={styles.adminCreateHeaderBtn}>
                <button
                  className={styles.adminCreateHeaderBtnClose}
                  onClick={() => {
                  resetStateOnClose();  
                  onClose();
                }}
                >
                  Close
                </button>
              </div>
            </div>
            <div className={styles.adminCreateForm}>
              <form>
                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    className={styles.adminCreateFormInput}
                    id="FirstName"
                    type="text"
                    value={newFirstName}
                    onChange={(event) =>{
                      console.log(event.target.value)
                      setNewFirstName(event.target.value)}
                    } 
                    aria-label="FirstName"
                    placeholder="First Name"
                  />
                </div>
                
                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    className={styles.adminCreateFormInput}
                    id="LastName"
                    type="text"
                    value={newLastName}
                    onChange={(event) => setNewLastName(event.target.value)}
                    aria-label="LastName"
                    placeholder="Last Name"
                  />
                </div>
                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    className={styles.adminCreateFormInput}
                    id="Username"
                    type="text"
                    value={newUsername}
                    onChange={(event) => setNewUsername(event.target.value)}
                    aria-label="Username"
                    placeholder="Username"
                  />
                </div>
                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    className={styles.adminCreateFormInput}
                    id="Password"
                    type="text"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    aria-label="Password"
                    placeholder="Password"
                  />
                </div>
                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    className={styles.adminCreateFormInput}
                    id="Email"
                    type="text"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                    aria-label="Email"
                    placeholder="Email"
                  />
                </div>
                <div className={styles.adminCreateFormSubmit}>
                  <button
                    className={styles.adminCreateFormSubmitBtn}
                    type="submit"
                    onClick={createAdmin}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default AdminCreate;
