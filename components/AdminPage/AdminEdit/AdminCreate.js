import styles from "../../styles/Edit.Admin.module.css";
import { useState } from "react";
const AdminCreate = () => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  /* 
once the backend is finished, need to make an axios post creating new admin using stored states for submit button!!
  */

  return (
    <div className={styles.adminCreateParent}>
      <div className={styles.adminCreateHeader}>
        <h1>Add an Admin</h1>
      </div>
      <div className={styles.adminCreateForm}>
        <form>
          <div className={styles.adminCreateFormInputLabel}>
            <label className={styles.adminCreateFormLabel}>First Name:</label>
            <input
              className={styles.adminCreateFormInput}
              id="FirstName"
              type="text"
              value={newFirstName}
              onChange={(event) => setNewFirstName(event.target.value)}
              aria-label="FirstName"
            />
          </div>
          <div className={styles.adminCreateFormInputLabel}>
            <label className={styles.adminCreateFormLabel}>Last Name:</label>
            <input
              className={styles.adminCreateFormInput}
              id="LastName"
              type="text"
              value={newLastName}
              onChange={(event) => setNewLastName(event.target.value)}
              aria-label="LastName"
            />
          </div>
          <div className={styles.adminCreateFormInputLabel}>
            <label className={styles.adminCreateFormLabel}>Username:</label>
            <input
              className={styles.adminCreateFormInput}
              id="Username"
              type="text"
              value={newUsername}
              onChange={(event) => setNewUsername(event.target.value)}
              aria-label="Username"
            />
          </div>
          <div className={styles.adminCreateFormInputLabel}>
            <label className={styles.adminCreateFormLabel}>Password:</label>
            <input
              className={styles.adminCreateFormInput}
              id="Password"
              type="text"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              aria-label="Password"
            />
          </div>
          <div className={styles.adminCreateFormInputLabel}>
            <label className={styles.adminCreateFormLabel}>Email:</label>
            <input
              className={styles.adminCreateFormInput}
              id="Email"
              type="text"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              aria-label="Email"
            />
          </div>
          <div className={styles.adminCreateFormSubmit}>
            <button className={styles.adminCreateFormSubmitBtn} type="submit">
              Create Admin!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminCreate;
