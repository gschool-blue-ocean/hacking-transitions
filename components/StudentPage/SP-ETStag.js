import React, { useEffect, useState } from "react";
import styles from "../../styles/StudentPage.module.css";

export default function SPETStag({ userETS }) {
   const [days2ETS, setDays2ETS] = useState(null);

   useEffect(() => {
      setDays2ETS(userETS);
   }, [userETS]);

   const createETStag = () => {
      const currentDate = new Date();
      const studentETS = new Date(days2ETS);

      let DiffTime = studentETS.getTime() - currentDate.getTime();

      let DiffDays = parseInt((DiffTime / (1000 * 3600 * 24)).toFixed(0));

      if (DiffDays <= 0) {
         return (
            <div className={styles.StuHeaderETStag} id="ETS-d">
               ETS'd
            </div>
         );
      } else if (DiffDays > 0 && DiffDays <= 30) {
         return (
            <div className={styles.StuHeaderETStag} id="ETS-30">
               30 Days
            </div>
         );
      } else if (DiffDays > 30 && DiffDays <= 60) {
         return (
            <div className={styles.StuHeaderETStag} id="ETS-60">
               60 Days
            </div>
         );
      } else if (DiffDays > 60 && DiffDays <= 90) {
         return (
            <div className={styles.StuHeaderETStag} id="ETS-90">
               90 Days
            </div>
         );
      } else if (DiffDays > 90 && DiffDays <= 120) {
         return (
            <div className={styles.StuHeaderETStag} id="ETS-120">
               120 Days
            </div>
         );
      } else {
         return (
            <div className={styles.StuHeaderETStag} id="ETS-120">
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