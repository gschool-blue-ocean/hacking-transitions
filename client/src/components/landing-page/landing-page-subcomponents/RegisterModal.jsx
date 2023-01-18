import { useState } from "react";
import styles from "../../../styles/LandingPage.css";
import { useRouter } from "next/router";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
//pull in the firebase config file with the assigned api keys for our app
// const config = require("./firebase/config");

// const firebaseConfig = {
//   apiKey: config.REACT_APP_APIKEY,
//   authDomain: config.REACT_APP_AUTHDOMAIN,
//   projectId: config.REACT_APP_PROJECTID,
//   storageBucket: config.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: config.REACT_APP_MESSAGINGSENDERID,
//   appId: config.REACT_APP_APPID,
// };

const RegisterModal = ({ open, onClose }) => {
  const router = useRouter();
  const [regCode, setRegCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const app = initializeApp(firebaseConfig);
  //auth links any user info sent to firebass api correlated with this app
  const auth = getAuth(app);

  if (!open) return null;

  const register = (event) => {
    event.preventDefault();
    fetch("/api/registration")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log("this is my data", data);
        data.map((passcode) => {
          // console.log(res)
          let cohortCode = passcode.register_code;
          let cohort = passcode.cohort_name;
          let cohortID = passcode.cohort_id;
          if (regCode == cohortCode) {
            console.log(cohort);
            console.log(cohortID);
            createUserWithEmailAndPassword(auth, email, Password)
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
                console.log(userCredential);
                if (userCredential) {
                  axios.post("/api/admin", {
                    admin: false,
                    first: firstName,
                    last: lastName,
                    username: Username,
                    //password: Password,
                    email: email,
                    cohort_name: cohort,
                    cohort_id: cohortID,
                  });
                  signOut(auth).then(() => {
                    // Sign-out successful.
                    //alert('New Admin account created for email ', newEmail);
                    window.alert("User Created");
                    //window.location.reload();
                    router.push("/admin/edit");
                  });
                }
              });
            //window.location.reload();
          } else {
            router.push("/registrationerror");
          }
        });
      });
  };

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
                  placeholder="Registration Code"
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
                <button
                  onClick={onClose}
                  className={styles.registerModalCloseBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
