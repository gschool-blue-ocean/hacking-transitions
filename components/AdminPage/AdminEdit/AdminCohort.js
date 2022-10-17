import styles from "../../../styles/Edit.Admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const AdminCohort = () => {
  //pull list of cohorts
  const [cohortList, setCohortList] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  useEffect(() => {
    axios.get("/api/cohorts", {}).then((res) => {
      setCohortList(res.data);
    });
  }, []);
  console.log(selectedCohort);
  console.log(cohortList);
  return (
    <>
      <div className={styles.adminCohortParent}>
        <div className={styles.adminCohortHeader}>
          <h1>Cohort Passcode</h1>
        </div>
        {/* <form> */}
        <div className={styles.adminCohortSelector}>
          <div className={styles.adminCohortDropdown}>
            <label for="cohorts">Choose a cohort:</label>
            <select
              name="cohorts"
              onChange={(event) => setSelectedCohort(event.target.value)}
            >
              <option key="nothing" value="nothing">
                --nothing selected--
              </option>
              {cohortList.map((cohort) => {
                return (
                  <option key={cohort.cohort_name} value={cohort.cohort_id}>
                    {cohort.cohort_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.admomCohortPassword}>
            <label for="cohortPassword">One time password: </label>
            <input type="text"></input>
          </div>
        </div>
        <div className={styles.adminCohortGenerate}>
          <button className={styles.adminCohortGenerateBtn}>Generate</button>
        </div>
        {/* </form> */}
      </div>
    </>
  );
};
export default AdminCohort;
