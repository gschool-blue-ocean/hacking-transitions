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
        <ul>
          {adminList.map((admin) => {
            //delete admin by id
            const deleteAdmin = (event) => {
              event.preventDefault();
              axios.delete(`/api/users/${admin.user_id}`, {
                id: admin.user_id,
              });
              window.location.reload();
            };
            console.log(admin);
            //update admin by id
            const updateAdmin = (event) => {
              event.preventDefault();
              axios.patch(`/api/admin`, {});
            };
            return (
              <>
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
                  <button className={styles.adminListListBtnTwo} type="submit">
                    Update
                  </button>
                  <form className={styles.adminListListEdit}>
                    <input
                      className={styles.adminListListInputFirstName}
                      id="FirstName"
                      type="text"
                      value={newFirstName}
                      onChange={(event) => setNewFirstName(event.target.value)}
                      aria-label="FirstName"
                      placeholder="First"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id="LastName"
                      type="text"
                      value={newLastName}
                      onChange={(event) => setNewLastName(event.target.value)}
                      aria-label="LastName"
                      placeholder="Last"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id="Username"
                      type="text"
                      value={newUsername}
                      onChange={(event) => setNewUsername(event.target.value)}
                      aria-label="Username"
                      placeholder="User"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id="Password"
                      type="text"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      aria-label="Password"
                      placeholder="Pass"
                    />
                    <input
                      className={styles.adminListListInputFirstName}
                      id="Email"
                      type="text"
                      value={newEmail}
                      onChange={(event) => setNewEmail(event.target.value)}
                      aria-label="Email"
                      placeholder="Email"
                    />
                  </form>
                </div>

                <hr className={styles.hr}></hr>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminList;
