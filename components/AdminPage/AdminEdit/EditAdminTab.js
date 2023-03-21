import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import AdminCohort from "./AdminCohort";
import styles from "../../../styles/Edit.Admin.module.css";
import CreateCohort from "../AdminEdit/CreateCohort";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const EditAdminTab = (user) => {
  return (
    // <div className={styles.adminEditParent}>
      <Tabs
        defaultActiveKey="AdminList"
      >
        <Tab eventKey="AdminList" title="Admin List">
          <AdminList />
        </Tab>
        <Tab eventKey="AdminCohort" title="Admin Cohort">
          <AdminCohort />
        </Tab>
        <Tab eventKey="CreateCohort" title="Create Cohort">
          <CreateCohort />
        </Tab>
      </Tabs>
    // </div>
  );
};

export default EditAdminTab;