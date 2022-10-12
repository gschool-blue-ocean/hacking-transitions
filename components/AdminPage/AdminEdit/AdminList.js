import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/Edit.Admin.module.css";
import AdminCreate from "./AdminCreate";
import AdminUpdate from "./AdminUpdate";

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isCreateOpen, setCreateIsOpen] = useState(false);
  const [isUpdateOpen, setUpdateIsOpen] = useState(false);
  //pull list of admins
  useEffect(() => {
    axios.get("/api/admin", {}).then((res) => {
      setAdminList(res.data);
    });
  }, []);

  return (
    <div className={styles.adminListParent}>
      <div className={styles.adminListHeader}>
        <h1>Current Admins</h1>
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
              <ul key={`keyadmin.user_id`}>
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
                    onClick={() => setUpdateIsOpen(true)}
                  >
                    Update
                  </button>
                  <AdminUpdate
                    admin={admin}
                    open={isUpdateOpen}
                    onClose={() => setUpdateIsOpen(false)}
                  />
                </div>
                <hr className={styles.hr}></hr>
              </ul>
            </>
          );
        })}
      </div>
      <div className={styles.adminCreate}>
        <button
          className={styles.adminCreateBtn}
          onClick={() => setCreateIsOpen(true)}
        >
          Create Admin
        </button>
        <AdminCreate
          open={isCreateOpen}
          onClose={() => setCreateIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default AdminList;
