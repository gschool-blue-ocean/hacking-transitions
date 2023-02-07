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

  const register = async (event) => {
    if (password.length < 6) {
      event.preventDefault();
      return setError("Password must be 6+ characters");
    }

    if (password !== confirmPassword) {
      event.preventDefault();
      return setError("Passwords do not match");
    }

    event.preventDefault();

    try {
      const { data: cohorts } = await axios.get("/api/registration");
      console.log("cohorts", cohorts);
      const cohort = cohorts.find(
        (passcode) => regCode == passcode.register_code
      );
      console.log("co", cohort);
      if (!cohort) {
        return setError("Invalid registration code");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        await axios.post("/api/admin", {
          admin: false,
          first: firstName,
          last: lastName,
          username: Username,
          email: email,
          cohort_name: cohort.cohort_name,
          cohort_id: cohort.cohort_id,
        });
        setIsLoading(true);
        setShowRegisterModal(false);
        const { data: apiUserData } = await axios.get(`api/users/${email}`);
        localStorage.setItem("currentUser", JSON.stringify(apiUserData));
        sessionStorage.setItem("currentUser", JSON.stringify(apiUserData));
        setError("");
        router.push("/student");
      }
    } catch (error) {
      console.log(error);
      let errorMessage;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "A user for this email already exists";
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
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
          <button onClick={handleHide} className={styles.reg_modal_close_btn}>
            Cancel
          </button>
          <button
            className={styles.reg_modal_submit_btn}
            type="submit"
            onClick={(event) => register(event)}
          >
            Submit
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default RegisterModal;
