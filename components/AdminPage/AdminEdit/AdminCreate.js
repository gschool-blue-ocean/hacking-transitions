import styles from "../../../styles/Edit.Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminCreate = ({ open, onClose }) => {
  if (!open) return null;
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const createAdmin = (event) => {
    event.preventDefault();
    axios.post("/api/admin", {
      admin: true,
      first: newFirstName,
      last: newLastName,
      username: newUsername,
      password: newPassword,
      email: newEmail,
    });
    window.location.reload();
  };
  return (
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
                onClick={onClose}
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
                  onChange={(event) => setNewFirstName(event.target.value)}
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
  );
};
export default AdminCreate;
