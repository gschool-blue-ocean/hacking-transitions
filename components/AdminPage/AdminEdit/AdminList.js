import styles from "../../../styles/Edit.Admin.module.css";
const AdminList = () => {
  return (
    <div className={styles.adminListParent}>
      <div className={styles.adminListHeader}>
        <h1>Admin List</h1>
      </div>
      <div className={styles.adminListList}></div>
    </div>
  );
};

export default AdminList;
