import { useState, useContext } from "react";
import styles from "../../styles/LoginStyles.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from "../../firebase/firebase";
import { appContext } from "../../pages/_app";

//pull in the firebase config file with the assigned api keys for our app
// const config = require('./config');
// const firebaseConfig = {
//   apiKey: "AIzaSyBNDQyZHitCAjyupnVxNzU1YKfI4zBOMss",
//   authDomain: "hackingtransitions-development.firebaseapp.com",
//   projectId: "hackingtransitions-development",
//   storageBucket: "hackingtransitions-development.appspot.com",
//   messagingSenderId: "473992713297",
//   appId: "1:473992713297:web:68e712395d1ccf79c49470",
// };

const RegisterModal = ({ open, onClose }) => {
  const {
    isLoading,
    setIsLoading,
    currentFirebaseUser,
    setCurrentFirebaseUser,
  } = useContext(appContext);
  const router = useRouter();
  const [regCode, setRegCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [apiUserData, setApiUserData] = useState();
  let stayLogged = false;

  // const app = initializeApp(firebaseConfig);
  //auth links any user info sent to firebass api correlated with this app
  // const auth = getAuth(app);

  if (!open) return null;

  const register = (event) => {
    event.preventDefault();

    fetch("/api/registration")
      .then((data) => {
        console.log("1.) fetching all cohort data");
        return data.json();
      })
      .then(async (data) => {
        console.log("this is my data", data);
        await data.map((passcode) => {
          // console.log(res)
          console.log("2.) mapping cohort passcodes");
          let cohortCode = passcode.register_code;
          let cohort = passcode.cohort_name;
          let cohortID = passcode.cohort_id;

          if (regCode == cohortCode) {
            try {
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
                .then(async (userCredential) => {
                  console.log("3.) creating user with email/pass on fb");
                  console.log(userCredential);
                  if (userCredential) {
                    await axios.post("/api/admin", {
                      admin: false,
                      first: firstName,
                      last: lastName,
                      username: Username,
                      email: email,
                      cohort_name: cohort,
                      cohort_id: cohortID,
                    });
                  }
                })
                .then(async () => {
                  let res = await axios.get(`api/users/${email}`);
                  apiUserData = res.data;
                  // setApiUserData(await res.data);
                  console.log(apiUserData);
                })
                .then(async () => {
                  localStorage.setItem(
                    "currentUser",
                    JSON.stringify(apiUserData)
                  );

                  sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify(apiUserData)
                  );
                })
                .then(() => {
                  console.log("localStorage: ", localStorage);
                  console.log("sessionStorage: ", sessionStorage);
                });

              // signInWithEmailAndPassword(auth, email, Password)
              //   .then(async (userCredential) => {
              //     console.log("4.) signing in with email/pass");
              //     setIsLoading(true);
              //     console.log("user done configure");
              //     await setCurrentFirebaseUser(userCredential.user);
              //     console.log("currentFirebaseUser: ", currentFirebaseUser);
              //     console.log("user: ", apiUserData);
              //     // const currentUser = userCredential.user;
              //     // console.log(currentUser);

              //     stayLogged &&
              //       localStorage.setItem(
              //         "currentUser",
              //         JSON.stringify(apiUserData)
              //       );
              //     sessionStorage.setItem(
              //       "currentUser",
              //       JSON.stringify(apiUserData)
              //     );
              //     user.admin
              //       ? (router.push("/admin"), setLoginData(""))
              //       : (router.push("/student"),
              //         dispatch(setActiveStudent(user)),
              //         setLoginData(""));
              //   })
              //   .catch((error) => {
              //     console.log(error.code);
              //     // setIsLoading(false);
              //     // if (error.code === "auth/wrong-password") {
              //     //   setLoginAttempts((prevCount) => prevCount - 1);
              //     //   setError(
              //     //     `Incorrect password... ${loginAttempts} attempts remaining`
              //     //   );
              //     // } else if (error.code === "auth/too-many-requests") {
              //     //   setError("Account temporarily locked... try again later");
              //     // }
              //     // setError("Failed to login with email & password");
              //     // const errorCode = error.code;
              //     // const errorMessage = error.message;
              //     // console.log(error.code);
              //     // console.log(error.code, error.message);
              //   });

              // signOut(auth).then(() => {
              //   // Sign-out successful.
              //   //alert('New Admin account created for email ', newEmail);
              //   window.alert("User Created");
              //   //window.location.reload();
              //   router.push("/admin/edit");
              // });
              // );
              //window.location.reload();
            } catch {
              router.push("/registrationerror");
            }
          }
          router.push("/student");
          // else {
          //   router.push("/registrationerror");
          // }
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
