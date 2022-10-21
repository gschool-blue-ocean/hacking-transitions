import React, { useEffect, useState } from "react";
import styles from "../../styles/StudentPage.module.css";
import { getDaysToEts } from "../../utility";
export default function SPETStag({ userETS }) {
  const [days2ETS, setDays2ETS] = useState(null);

  useEffect(() => {
    setDays2ETS(userETS);
  }, [userETS]);

  const createETStag = () => {
    const DiffDays =  getDaysToEts(userETS);

    if (DiffDays <= 0) {
      return (
        <div className={styles.StuHeaderETStag} id={styles.ETSd}>
          ETS complete
        </div>
      );
    } else if (DiffDays > 0 && DiffDays <= 30) {
      return (
        <div className={styles.StuHeaderETStag} id={styles.ETS30}>
          30 Days
        </div>
      );
    } else if (DiffDays > 30 && DiffDays <= 60) {
      return (
        <div className={styles.StuHeaderETStag} id={styles.ETS60}>
          60 Days
        </div>
      );
    } else if (DiffDays > 60 && DiffDays <= 90) {
      return (
        <div className={styles.StuHeaderETStag} id={styles.ETS90}>
          90 Days
        </div>
      );
    } else if (DiffDays > 90 && DiffDays <= 120) {
      return (
        <div className={styles.StuHeaderETStag} id={styles.ETS120}>
          120 Days
        </div>
      );
    } else {
      return (
        <div className={styles.StuHeaderETStag} id={styles.ETS120}>
          120+ Days
        </div>
      );
    }
  };

  if (!days2ETS) {
    return <div>Loading...</div>;
  } else {
    return <div className={styles.StuHeaderETStag}>{createETStag()}</div>;
  }
}
