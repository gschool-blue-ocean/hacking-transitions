import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/Edit.Admin.module.css";
const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  useEffect(() => {
    axios.get("/api/admin", {}).then((res) => {
      setAdminList(res);
      console.log(adminList);
    });
  }, []);
  return (
    <div className={styles.adminListParent}>
      <div className={styles.adminListHeader}>
        <h1>List of Admins</h1>
      </div>
      <div className={styles.adminListList}></div>
    </div>
  );
};

export default AdminList;
