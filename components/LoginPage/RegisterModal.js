import { useState, useContext } from "react";
import styles from "../../styles/LoginStyles.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { appContext } from "../../pages/_app";

const RegisterModal = ({ open, onClose }) => {
  const {
    isLoading,
    setIsLoading,
    currentFirebaseUser,
    setCurrentFirebaseUser,
    showRegisterModal,
    setShowRegisterModal,
  } = useContext(appContext);
  const router = useRouter();
  const [regCode, setRegCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [apiUserData, setApiUserData] = useState();

  // if (!open) return null;

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
                  // await setCurrentFirebaseUser(userCredential.user);
                  // console.log("currentFirebaseUser: ", currentFirebaseUser);
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
                .then(async () => {
                  console.log("localStorage: ", localStorage);
                  console.log("sessionStorage: ", sessionStorage);
                  await router.push("/student");
                });
            } catch {
              router.push("/registrationerror");
            }
          }
        });
      });
  };

  return (
    <>
      {open && (
        <>
          {/* ----------- Blurred out background overlay ------------- */}
          <div className={styles.registerModalCreateOverlay} onClick={onClose}>
            {/* -------------------------------------------------------- */}
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
          </div>
        </>
      )}
    </>
  );
};

export default RegisterModal;
