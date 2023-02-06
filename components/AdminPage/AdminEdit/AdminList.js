import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/Edit.Admin.module.css";
import AdminCreate from "./AdminCreate";
import AdminUpdate from "./AdminUpdate";
import { useRouter } from "next/router";

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [isCreateOpen, setCreateIsOpen] = useState(false);
  const [isUpdateOpen, setUpdateIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const router = useRouter(); 
  //pull list of admins

  useEffect(() => {
    axios.get("/api/admin", {}).then((res) => {
      setAdminList(res.data);
    });
  }, []);

  return (
    <div className={styles.adminListParent}>
      <div className={styles.adminListHeader}>
        <p>Current Admins</p>
      </div>
      <div className={styles.adminListList}>
        <ul>
          {adminList.map((admin, { i }) => {
            const deleteAdmin = (event) => {
              event.preventDefault();
              
              axios.delete(`/api/users/${admin.user_id}`, {
                id: admin.user_id,
              });
              window.location.reload();
              router.push("/admin/edit")

            };

            return (
              <>
                <ul className={i} key={admin.user_id}>
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
                      id={i}
                      className={styles.adminListListBtnTwo}
                      type="submit"
                      onClick={() => {
                        setUpdateData(admin);
                        setUpdateIsOpen(true);
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <hr className={styles.hr}></hr>
                </ul>
              </>
            );
          })}
        </ul>

        <AdminUpdate
          admin={updateData}
          open={isUpdateOpen}
          onClose={() => setUpdateIsOpen(false)}
        />
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
