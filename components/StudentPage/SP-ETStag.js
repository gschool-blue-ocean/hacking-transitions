import React, { useEffect, useState } from "react";
import styles from "../../styles/StudentPage.module.css";
import { getDaysToEts } from "../../utility";
import Link from "next/link";



export default function SPETStag({ userETS }) {
  const [days2ETS, setDays2ETS] = useState(null);

  useEffect(() => {
    setDays2ETS(userETS);
  }, [userETS]);

  const ETSeditStyle = {
   textDecoration: 'none',
   position: 'relative',
   color: 'white'
  }

  const createETStag = () => {
    const DiffDays =  getDaysToEts(userETS);

      if (DiffDays <= 0) {
         return (
            <div className={styles.StuHeaderETStag} id={styles.ETSd}>
               ETS: Complete
            </div>
         );
      } else if (DiffDays > 0 && DiffDays <= 30) {
         return (
            <div className={styles.StuHeaderETStag} id={styles.ETS30}>
              ETS: 30 Days
            </div>
         );
      } else if (DiffDays > 30 && DiffDays <= 60) {
         return (
            <div className={styles.StuHeaderETStag} id={styles.ETS60}>
              ETS: 60 Days
            </div>
         );
      } else if (DiffDays > 60 && DiffDays <= 90) {
         return (
            <div className={styles.StuHeaderETStag} id={styles.ETS90}>
            ETS: 90 Days
            </div>
         );
      } else if (DiffDays > 90 && DiffDays <= 120) {
         return (
            <div className={styles.StuHeaderETStag} id={styles.ETS120}>
             ETS: 120 Days
            </div>
         );
      } else {
         return (
            <div className={styles.StuHeaderETStag} id={styles.ETS120}>
               ETS: 120+ Days
            </div>
         );
      }
   };

   if (!days2ETS) {
      return (
         <div
         className={styles.StuHeaderETStag} id={styles.ETSna} 
         >
            <a style={ETSeditStyle} href="student/editStudentModal">
            Please Enter ETS Date
            </a></div>
         
      )
   } else {
      return <div className={styles.StuHeaderETStag}>{createETStag()}</div>;
   }

}
