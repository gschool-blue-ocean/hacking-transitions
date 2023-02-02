import React, { useState, useEffect } from "react";
import styles from "../../styles/StudentPage.module.css";
import axios from "axios";


export default function SPDependents({ student }) {
  const [dependents, setDependents] = useState([]);
  useEffect(() => {
    getDependents();
  }, [student]);

  ///////////////// GET request for dependents refactored to use axios ////////////////

  const getDependents = async () => {
    try {
        const res = await axios.get(`/api/dependents/sponsor/${student.user_id}`);
        setDependents(res.data);
    } catch (err) {
        console.log(err);
    }
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
