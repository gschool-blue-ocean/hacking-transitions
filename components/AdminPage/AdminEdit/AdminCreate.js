import styles from "../../../styles/Edit.Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
//pull in the firebase config file with the assigned api keys for our app
// const config = require("../../Login/config");

const firebaseConfig = {
  apiKey: "AIzaSyBNDQyZHitCAjyupnVxNzU1YKfI4zBOMss",
  authDomain: "hackingtransitions-development.firebaseapp.com",
  projectId: "hackingtransitions-development",
  storageBucket: "hackingtransitions-development.appspot.com",
  messagingSenderId: "473992713297",
  appId: "1:473992713297:web:68e712395d1ccf79c49470",
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
    createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          alert("This user for this email already exists");
        } else {
          alert(errorMessage);
        }
        // console.log(errorCode)
      })
      .then((userCredential) => {
        //If no error, signed in, automatic due to the firebase function
        if (userCredential) {
          //Will post to app database if verified by firebase
          axios.post("/api/admin", {
            admin: true,
            first: newFirstName,
            last: newLastName,
            username: newUsername,
            // password: newPassword, password no longer stored in our database
            email: newEmail,
            cohort_name: null,
            cohort_id: null,
          });
          // signOut(auth).then(() => {
          //   // Sign-out successful.
          //   alert("New Admin account created for email ", newEmail);
          //   //resetting text box inputs to give appearance of refresh
          //   resetStateOnClose();
          // });
          onClose();
          window.location.reload();
          // router.push("/admin/edit");

        }
      });
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
                    onClose();
                    resetStateOnClose();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            <div className={styles.adminCreateForm}>
              <form onSubmit={createAdmin}>
                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    required
                    className={styles.adminCreateFormInput}
                    id="FirstName"
                    type="text"
                    value={newFirstName}
                    onChange={(event) => {
                      console.log(event.target.value);
                      setNewFirstName(event.target.value);
                    }}
                    aria-label="FirstName"
                    placeholder="First Name"
                  />
                </div>

                <div className={styles.adminCreateFormInputLabel}>
                  <input
                    className={styles.adminCreateFormInput}
                    id="LastName"
                    type="text"
                    required
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
                    required
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
                    type="password"
                    required
                    minLength="6"
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
                    type="email"
                    required
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
