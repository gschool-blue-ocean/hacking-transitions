import React from "react";
import ArchivePage from "../../components/Archive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkLogin } from "../../utility";
import { setActiveStudent } from "../../redux/features/app-slice";
import sql from "../../database/connection";

export default function Archive({ cohorts, students }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await checkLogin();
      console.log(user);

      if (user === null) {
        router.push("/");
      } else if (user !== "admin") {
        dispatch(
          setActiveStudent(JSON.parse(sessionStorage.getItem("currentUser")))
        );
        router.push("/student");
      } else {
        setAdmin(true);
      }
    })();
  }, []);

  return (
    admin && (
      <div>
        <ArchivePage cohorts={cohorts} students={students} />
      </div>
    )
  );
}
export const getStaticProps = async () => {
  const cohorts =
    await sql`SELECT * FROM cohorts WHERE archived = true ORDER BY cohort_id DESC LIMIT 5;`;

  const students =
    await sql`SELECT * FROM users WHERE admin = false AND archived = true LIMIT 5;`;

  return {
    props: {
      cohorts,
      students,
    },
  };
};
