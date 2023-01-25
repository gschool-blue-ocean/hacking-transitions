import styles from "../../styles/Edit.Admin.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { appContext } from "../_app";

const AdminUpdate = () => {
  const { showUpdateModal, setShowUpdateModal } = useContext(appContext);
  // const [open, setOpen] = useState(true);
  const admin = JSON.parse(sessionStorage.getItem("currentUser"));
  // const onClose = () => setOpen(!open);
  console.log(admin);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const router = useRouter();

  const resetStateWhenCanceled = () => {
    setNewFirstName("");
    setNewLastName("");
    setNewUsername("");
    // setNewPassword("");
    // setNewEmail("");
  };

  const adminPatch = (event) => {
    event.preventDefault();
    const inputPassword = newPassword;
    //check if the input is empty, if yes, set it equal to old value
    if (newFirstName === "") {
      newFirstName = admin.first;
    }
    if (newLastName === "") {
      newLastName = admin.last;
    }
    if (newUsername === "") {
      newUsername = admin.username;
    }
    // if(newEmail===''){
    //   newEmail=admin.email;
    // }
    // axios.patch(`/api/admin/${admin.user_id}`, {
    //   first: newFirstName,
    //   last: newLastName,
    //   email: admin.email,
    //   username: newUsername,
    //   password: newPassword,
    // });
    window.location.reload();
    router.push("/admin");
  };

  return (
    showUpdateModal && (
      <>
        <div className={styles.adminUpdateOverlay}></div>
        <div className={styles.adminUpdateModal}>
          <div className={styles.adminUpdateParent}>
            <div className={styles.adminUpdateHeader}>
              <div className={styles.adminUpdateHeaderText}>
                <h1>Update User</h1>
              </div>
              <div className={styles.adminUpdateHeaderBtn}>
                <button
                  className={styles.adminUpdateHeaderBtnClose}
                  onClick={() => {
                    resetStateWhenCanceled();
                    setShowUpdateModal(false);
                    // onClose();
                    // router.push("/admin");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            <form onSubmit={adminPatch}>
              <div className={styles.adminUpdateFormLabel}>
                Firstname
                <input
                  className={styles.adminUpdateFormInput}
                  id={`first ${admin.user_id}`}
                  type="text"
                  defaultValue={admin.first}
                  onChange={(event) => setNewFirstName(event.target.value)}
                  aria-label={`first ${admin.user_id}`}
                  placeholder={`Current First Name: ${admin.first}`}
                />
              </div>
              <div className={styles.adminUpdateFormLabel}>
                Lastname
                <input
                  className={styles.adminUpdateFormInput}
                  id={`last ${admin.user_id}`}
                  type="text"
                  defaultValue={admin.last}
                  onChange={(event) => setNewLastName(event.target.value)}
                  aria-label={`last ${admin.user_id}`}
                  placeholder={`Current Last Name: ${admin.last}`}
                />
              </div>
              <div className={styles.adminUpdateFormLabel}>
                Username
                <input
                  className={styles.adminUpdateFormInput}
                  id={`username ${admin.user_id}`}
                  type="text"
                  defaultValue={admin.username}
                  onChange={(event) => setNewUsername(event.target.value)}
                  aria-label={`username ${admin.user_id}`}
                  placeholder={`Current Username: ${admin.username}`}
                />
              </div>
              {/* Assume Admin cannot change other Admin email and password */}
              <div className={styles.adminUpdateFormLabel}>
                Password
                <input
                  className={styles.adminUpdateFormInput}
                  id={`password ${admin.user_id}`}
                  type="password"
                  onChange={(event) => setNewPassword(event.target.value)}
                  aria-label={`password ${admin.user_id}`}
                  placeholder={`Change Password:`}
                />
              </div>
              <div className={styles.adminUpdateFormLabel}>
                Email
                <input
                  className={styles.adminUpdateFormInput}
                  id={`email ${admin.user_id}`}
                  type="email"
                  defaultValue={admin.email}
                  onChange={(event) => setNewEmail(event.target.value)}
                  aria-label={`email ${admin.user_id}`}
                  placeholder={`Current email: ${admin.email}`}
                />
              </div>
              <div className={styles.adminUpdateFormSubmit}>
                <button
                  className={styles.adminUpdateFormSubmitBtn}
                  type={"submit"}
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
