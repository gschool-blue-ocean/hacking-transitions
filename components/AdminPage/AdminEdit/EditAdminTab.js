import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import AdminCohort from "./AdminCohort";
import styles from "../../../styles/Edit.Admin.module.css";

const EditAdminTab = (user) => {
  return (
    <>
      <div className={styles.adminEditParent}>
        <AdminList />
        <AdminCohort />
      </div>
    </>
  );
};

export default EditAdminTab;
