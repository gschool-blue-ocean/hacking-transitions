import s from "../../styles/AdminPage.module.css";
import CohortMenu from "./CohortMenu";
import CohortView from "./CohortView";
import Chat from "../Chat";
import { useState, useEffect } from "react";

import CreateCohort from "./CreateCohort";
import { server } from "../../utility";
const AdminContainer = ({ allCohorts }) => {
  const [cohorts] = useState(allCohorts);
  const [currCohort, setCurrCohort] = useState([]);
  useEffect(() => {
    (async () => {
      if (cohorts.length > 0) {
        const topcohort = cohorts[cohorts.length - 1];
        const students = await (
          await fetch(`${server}/api/users/cohort/${topcohort.cohort_id}`)
        ).json();
        setCurrCohort([
          {
            cohort_id: topcohort.cohort_id,
            cohort_name: topcohort.cohort_name,
            students,
          },
        ]);
      }
    })();
  });

  return (
    <div className={s.background}>
      <div className={s.container}>
        <div className={s.tools_container}>
          <CreateCohort />
          <CohortMenu
            cohorts={cohorts}
            currCohort={currCohort}
            setCurrCohort={setCurrCohort}
          />
        </div>
        <CohortView currCohort={currCohort} />
        <Chat />
      </div>
    </div>
  );
};

export default AdminContainer;
