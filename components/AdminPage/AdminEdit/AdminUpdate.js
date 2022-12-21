import styles from "../../../styles/Edit.Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminUpdate = ({ admin, open, onClose }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const router = useRouter();
  const adminPatch = (event) => {
    event.preventDefault();
    axios.patch(`/api/admin/${admin.user_id}`, {
      first: newFirstName,
      last: newLastName,
      email: newEmail,
      username: newUsername,
      password: newPassword,
    });
    // window.location.reload();
    router.push("/admin/edit");
  };

  return (
    open && (
      <>
        <div className={styles.adminUpdateOverlay}></div>
        <div className={styles.adminUpdateModal}>
          <div className={styles.adminUpdateParent}>
            <div className={styles.adminUpdateHeader}>
              <div className={styles.adminUpdateHeaderText}>
                <h1>Update Admin</h1>
              </div>
              <div className={styles.adminUpdateHeaderBtn}>
                <button
                  className={styles.adminUpdateHeaderBtnClose}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
            <form>
              <div className={styles.adminUpdateFormLabel}>
                <input
                  className={styles.adminUpdateFormInput}
                  id={`first ${admin.user_id}`}
                  type="text"
                  onChange={(event) => setNewFirstName(event.target.value)}
                  aria-label={`first ${admin.user_id}`}
                  placeholder={`Current First Name: ${admin.first}`}
                />
              </div>
              <div className={styles.adminUpdateFormLabel}>
                <input
                  className={styles.adminUpdateFormInput}
                  id={`last ${admin.user_id}`}
                  type="text"
                  onChange={(event) => setNewLastName(event.target.value)}
                  aria-label={`last ${admin.user_id}`}
                  placeholder={`Current Last Name: ${admin.last}`}
                />
              </div>
              <div className={styles.adminUpdateFormLabel}>
                <input
                  className={styles.adminUpdateFormInput}
                  id={`username ${admin.user_id}`}
                  type="text"
                  onChange={(event) => setNewUsername(event.target.value)}
                  aria-label={`username ${admin.user_id}`}
                  placeholder={`Current Username: ${admin.username}`}
                />
              </div>
              {/* <div className={styles.adminUpdateFormLabel}>
                <input
                  className={styles.adminUpdateFormInput}
                  id={`password ${admin.user_id}`}
                  type="text"
                  onChange={(event) => setNewPassword(event.target.value)}
                  aria-label={`password ${admin.user_id}`}
                  placeholder={`Current Password: ${admin.password}`}
                />
              </div> */}
              <div className={styles.adminUpdateFormLabel}>
                <input
                  className={styles.adminUpdateFormInput}
                  id={`email ${admin.user_id}`}
                  type="text"
                  onChange={(event) => setNewEmail(event.target.value)}
                  aria-label={`email ${admin.user_id}`}
                  placeholder={`Current email: ${admin.email}`}
                />
              </div>
              <div className={styles.adminUpdateFormSubmit}>
                <button
                  className={styles.adminUpdateFormSubmitBtn}
                  onClick={adminPatch}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default AdminUpdate;
