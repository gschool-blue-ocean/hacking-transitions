import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/Edit.Admin.module.css";

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  //pull list of admins
  useEffect(() => {
    axios.get("/api/admin", {}).then((res) => {
      setAdminList(res.data);
    });
  }, []);

  return (
    <div className={styles.adminListParent}>
      <div className={styles.adminListHeader}>
        <h1>List of Admins</h1>
      </div>
      <div className={styles.adminListList}>
        {adminList.map((admin) => {
          const updateAdmin = (event) => {
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
          const deleteAdmin = (event) => {
            event.preventDefault();
            axios.delete(`/api/users/${admin.user_id}`, {
              id: admin.user_id,
            });
            window.location.reload();
          };

          return (
            <>
              <ul value={admin.user_id}>
                <div className={styles.adminListListTextBox}>
                  <p className={styles.adminListListText}>
                    <b>{`${admin.first} ${admin.last}`}</b>
                  </p>
                  <button
                    className={styles.adminListListBtn}
                    type="submit"
                    onClick={deleteAdmin}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.adminListListBtnTwo}
                    type="submit"
                    onClick={updateAdmin}
                  >
                    Update
                  </button>
                  <form className={styles.adminListListEdit}>
                    <input
                      className={styles.adminListListInputFirstName}
                      id={`first ${admin.user_id}`}
                      type="text"
                      //value={newFirstName}
                      onChange={(event) => setNewFirstName(event.target.value)}
                      aria-label={`first ${admin.user_id}`}
                      placeholder="First"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id={`last ${admin.user_id}`}
                      type="text"
                      //value={newLastName}
                      onChange={(event) => setNewLastName(event.target.value)}
                      aria-label={`last ${admin.user_id}`}
                      placeholder="Last"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id={`username ${admin.user_id}`}
                      type="text"
                      //value={newUsername}
                      onChange={(event) => setNewUsername(event.target.value)}
                      aria-label={`username ${admin.user_id}`}
                      placeholder="User"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id={`password ${admin.user_id}`}
                      type="text"
                      //value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      aria-label={`password ${admin.user_id}`}
                      placeholder="Pass"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id={`email ${admin.user_id}`}
                      type="text"
                      //value={newEmail}
                      onChange={(event) => setNewEmail(event.target.value)}
                      aria-label={`email ${admin.user_id}`}
                      placeholder="Email"
                    />
                  </form>
                </div>
                <hr className={styles.hr}></hr>
              </ul>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AdminList;
