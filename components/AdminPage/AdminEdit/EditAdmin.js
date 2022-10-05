import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import styles from "../../../styles/Edit.Admin.module.css";

const EditAdminTab = (user) => {
  return (
    <>
      {/* header */}
      <div className={styles.adminEditParent}>
        <AdminCreate />
        <AdminList />
      </div>
      {/* footer */}
    </>
  );
};

export default EditAdminTab;