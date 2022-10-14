import React, { useState, useEffect } from "react";
import styles from "../../styles/StudentPage.module.css";
import { server } from "../../utility";

export default function SPDependents({ student }) {
   const [dependents, setDependents] = useState([]);
   useEffect(() => {
      getDependents();
   }, [student]);

   const getDependents = () => {
      fetch(`${server}/api/dependents/sponsor/${student.user_id}`)
         .then((res) => res.json())
         .then((deps) => {
            setDependents(deps);
         });
   };

   if (student.has_dependents) {
      return dependents.map((dep) => {
         return (
            <div className={styles.DependentCard} key={dep.dependent_id}>
               <div>{dep.relation}</div>
               <div id="Dependent--Age">{dep.age}</div>
            </div>
         );
      });
   }
}