import { Modal, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import styles from "../../styles/LoginStyles.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { appContext } from "../../pages/_app";

const RegisterModal = () => {
  const { setIsLoading, showRegisterModal, setShowRegisterModal } =
    useContext(appContext);
  const router = useRouter();
  const [regCode, setRegCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiUserData, setApiUserData] = useState();
  const [error, setError] = useState("");

  const register = (event) => {
    if (password.length < 6) {
      event.preventDefault();
      return setError("Password must be 6+ characters");
    }

    if (password !== confirmPassword) {
      event.preventDefault();
      return setError("Passwords do not match");
    }

    event.preventDefault();

    fetch("/api/registration")
      .then((data) => {
        console.log("1.) fetching all cohort data");
        setIsLoading(true);
        setShowRegisterModal(false);
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
              createUserWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  if (errorCode == "auth/email-already-in-use") {
                    alert("This user for this email already exists");
                  } else {
                    alert(errorMessage);
                  }
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
                  setError("");
                  await router.push("/student");
                });
            } catch {
              setIsLoading(false);
              router.push("/registrationerror");
            }
          }
        });
      });
  };

  const handleHide = () => {
    setShowRegisterModal(false);
    setError("");
    setRegCode("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Modal
      contentClassName={styles.reg_modal_container}
      show={showRegisterModal}
      onHide={handleHide}
      size="md"
      centered
    >
      <form className={styles.reg_modal_form}>
        <h1 className={styles.reg_modal_h1}>Sign Up</h1>

        <input
          className={styles.reg_code_input}
          id="reg code"
          type="text"
          placeholder="Registration Code"
          onChange={(event) => setRegCode(event.target.value)}
          value={regCode}
          required
        />

        <input
          className={styles.reg_inputs}
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          value={Username}
          required
        />

        <input
          className={styles.reg_inputs}
          type="text"
          placeholder="First Name"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
          required
        />

        <input
          className={styles.reg_inputs}
          type="text"
          placeholder="Last Name"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
          required
        />

        <input
          className={styles.reg_inputs}
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />

        <input
          className={styles.reg_inputs}
          type="text"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />

        <input
          className={styles.reg_inputs}
          type="text"
          placeholder="Confirm Password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
          required
        />
        {/* ------------ if error, show alert with error---------------- */}
        {error && (
          <Alert
            className={styles.reg_error_alert}
            variant="danger"
            style={{
              textAlign: "center",
            }}
          >
            {error}
          </Alert>
        )}
        {/* ----------------------------------------------------------- */}
        <section className={styles.reg_modal_btns_container}>
          <button
            className={styles.reg_modal_submit_btn}
            type="submit"
            onClick={(event) => register(event)}
          >
            Submit
          </button>
          <button onClick={handleHide} className={styles.reg_modal_close_btn}>
            Cancel
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default RegisterModal;
