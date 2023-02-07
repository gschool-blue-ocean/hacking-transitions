import styles from "../../../styles/Edit.Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

const AdminUpdate = ({ admin, open, onClose }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [newEmail, setNewEmail] = useState("");
  const router = useRouter();
  const resetStateWhenCanceled = () =>{
    setNewFirstName("");
    setNewLastName("");
    setNewUsername("");
    // setNewPassword("");
    // setNewEmail("");
  }
  const adminPatch = (event) => {
    event.preventDefault();
    //const inputPassword = newPassword;
    //check if the input is empty, if yes, set it equal to old value
    if(newFirstName===''){
      newFirstName=admin.first;
    }
    if(newLastName===''){
      newLastName=admin.last;
    }
    if(newUsername===''){
      newUsername=admin.username;
    }
    // if(newEmail===''){
    //   newEmail=admin.email;
    // }
    axios.patch(`/api/admin/${admin.user_id}`, {
      first: newFirstName,
      last: newLastName,
      email: admin.email,
      username: newUsername,
      
    });
    window.location.reload();
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
                  onClick={()=>{
                    resetStateWhenCanceled();
                    onClose();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            <form>
              <div className={styles.adminUpdateFormLabel}>
                Firstname
                <input
                  className={styles.adminUpdateFormInput}
                  id={`first ${admin.user_id}`}
                  type="text"
                  defaultValue={admin.first}
                  onChange={(event) =>setNewFirstName(event.target.value)}
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
