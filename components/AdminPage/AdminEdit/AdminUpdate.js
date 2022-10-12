import styles from "../../../styles/Edit.Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminUpdate = ({ admin, open, onClose }) => {
  if (!open) return null;
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const adminPatch = (event) => {
    event.preventDefault();
    axios.patch(`/api/admin/${admin.user_id}`, {
      first: newFirstName,
      last: newLastName,
      email: newEmail,
      username: newUsername,
      password: newPassword,
    });
    window.location.reload();
  };
  return (
    <>
      <div className={styles.adminUpdateOverlay}></div>
      <div className={styles.adminUpdateModal}>
        <form className={styles.adminListListEdit}>
          <button onClick={onClose}>close</button>
          <input
            className={styles.adminListListInputFirstName}
            id={`first ${admin.user_id}`}
            type="text"
            onChange={(event) => setNewFirstName(event.target.value)}
            aria-label={`first ${admin.user_id}`}
            placeholder={admin.first}
          />
          <input
            className={styles.adminListListInputFirstName}
            id={`last ${admin.user_id}`}
            type="text"
            onChange={(event) => setNewLastName(event.target.value)}
            aria-label={`last ${admin.user_id}`}
            placeholder={admin.last}
          />
          <input
            className={styles.adminListListInputFirstName}
            id={`username ${admin.user_id}`}
            type="text"
            onChange={(event) => setNewUsername(event.target.value)}
            aria-label={`username ${admin.user_id}`}
            placeholder="User"
          />
          <input
            className={styles.adminListListInputFirstName}
            id={`password ${admin.user_id}`}
            type="text"
            onChange={(event) => setNewPassword(event.target.value)}
            aria-label={`password ${admin.user_id}`}
            placeholder="Pass"
          />
          <input
            className={styles.adminListListInputFirstName}
            id={`email ${admin.user_id}`}
            type="text"
            onChange={(event) => setNewEmail(event.target.value)}
            aria-label={`email ${admin.user_id}`}
            placeholder="Email"
          />
          <button onClick={adminPatch}>submit</button>
        </form>
      </div>
    </>
  );
};

export default AdminUpdate;
