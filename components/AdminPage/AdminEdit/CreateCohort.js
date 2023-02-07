import styles from "../../../styles/Edit.Admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const createCohort = () => {

  const [cohortName, setCohortName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const router = useRouter();

  let existingCohortList = []

  const newCohort = (event) => {
    axios.get("/api/cohorts", {}).then((res) => {
      console.log("this is the data", res.data)
      res.data.map((cohortData) => {

        existingCohortList.push(cohortData.cohort_name)
        console.log("THIS IS existing cohort", existingCohortList)
      })
      console.log("THIS IS cohortName", cohortName)
      if (existingCohortList.includes(cohortName)) {
        window.alert("Cohort already exists!")
        //window.location.reload();
        console.log("cohort already exists")
        router.push("/admin/edit");
      }
      else {
        axios.post("/api/cohorts", {
          cohort_name: cohortName,
          start_date: startDate,
          end_date: endDate,
          active: true,
          archived: false,
          register_code: registerCode
        })
        window.alert("Cohort created!")
        window.location.reload();
        router.push("/admin/edit");
      }
      existingCohortList = []
    })
  }

  return (
    <>
      <div className={styles.createCohortParent}>
        <div className={styles.createCohortHeader}>
          <p>Create Cohort</p>
        </div>

        <div className={styles.createCohortSelector}>
          <label for="create cohort" className={styles.createCohortInputLabel}>
            Create New Cohort:
          </label>
          <input
            className={styles.createCohortInput}
            type="text" placeholder="Create Cohort"
            onChange={(event) => setCohortName(event.target.value)}
          />

          <div className={styles.createCohortStartDate}>
            <label for="Start Date" className={styles.createCohortStartDateLabel}>
              Select Start Date:
            </label>
            <input
              className={styles.createCohortStartDateInput}
              type="text" placeholder="Start Date"
              onChange={(event) => setStartDate(event.target.value)}
            />
            <label for="End Date" className={styles.createCohortEndDateLabel}>
              Select End Date:
            </label>
            <input
              className={styles.createCohortEndDateInput}
              type="text" placeholder="End Date"
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div className={styles.createCohortPassword}>
            <label
              className={styles.createCohortPasswordLabel}
              for="cohortPassword"
            >
              One Time Password:
            </label>
            <input
              className={styles.createCohortPasswordInput}
              type="text" placeholder="Enter OTP of your choice"
              onChange={(event) => setRegisterCode(event.target.value)}
            />
          </div>

        </div>

        <div className={styles.createCohortGenerate}>
          <button
            className={styles.createCohortGenerateBtn}
            onClick={newCohort}
          >
            Generate
          </button>
        </div>

      </div>

    </>

  );
}

export default createCohort;