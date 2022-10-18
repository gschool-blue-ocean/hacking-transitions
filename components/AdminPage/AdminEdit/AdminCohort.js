import styles from "../../../styles/Edit.Admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const AdminCohort = () => {
  //pull list of cohorts
  const [cohortList, setCohortList] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [newPasscode, setNewPasscode] = useState("");

  useEffect(() => {
    axios.get("/api/cohorts", {}).then((res) => {
      setCohortList(res.data);
    });
  }, []);

  const cohortPatch = (event) => {
    event.preventDefault();
    axios.patch(`/api/cohorts/cohortpass/${selectedCohort}`, {
      register_code: newPasscode,
    });
    window.location.reload();
  };
  console.log(selectedCohort);
  console.log(newPasscode);
  return (
    <>
      <div className={styles.adminCohortParent}>
        <div className={styles.adminCohortHeader}>
          <h1>Cohort Passcode</h1>
        </div>

        <div className={styles.adminCohortSelector}>
          <div className={styles.adminCohortDropdown}>
            <label for="cohorts" className={styles.adminCohortDropdownLabel}>
              Choose a cohort
            </label>
            <select
              name="cohorts"
              onChange={(event) => setSelectedCohort(event.target.value)}
              className={styles.adminCohortDropdownSelect}
            >
              <option key="nothing" value="nothing">
                --nothing selected--
              </option>
              {cohortList.map((cohort) => {
                console.log(cohort);

                return (
                  <option key={cohort.cohort_name} value={cohort.cohort_id}>
                    {cohort.cohort_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.adminCohortPassword}>
            <label
              className={styles.adminCohortPasswordLabel}
              for="cohortPassword"
            >
              One time password
            </label>
            <input
              className={styles.adminCohortPasswordInput}
              type="text"
              onChange={(event) => setNewPasscode(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.adminCohortGenerate}>
          <button
            className={styles.adminCohortGenerateBtn}
            onClick={cohortPatch}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
};
export default AdminCohort;
