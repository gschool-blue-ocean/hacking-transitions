import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/Edit.Admin.module.css";
const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
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
            return (
              <ul key={admin.user_id}>
                <p className={styles.adminListListText}>
                  <b>{`${admin.first} ${admin.last}`}</b>
                  <button
                    className={styles.adminListListBtn}
                    type="submit"
                    onClick={deleteAdmin}
                  >
                    Delete
                  </button>
                </p>
                <hr className={styles.hr}></hr>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminList;