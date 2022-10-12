import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import styles from "../../../styles/Edit.Admin.module.css";

const EditAdminTab = (user) => {
  return (
    <>
      <div className={styles.adminEditParent}>
        <AdminList />
      </div>
    </>
  );
};

export default EditAdminTab;
