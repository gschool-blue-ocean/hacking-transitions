import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import AdminCohort from "./AdminCohort";
import styles from "../../../styles/Edit.Admin.module.css";
import CreateCohort from "../AdminEdit/CreateCohort"

const EditAdminTab = (user) => {
  return (
    <>
      <div className={styles.adminEditParent}>
        <AdminList />
        <AdminCohort />
        <CreateCohort />
      </div>
    </>
  );
};

export default EditAdminTab;
