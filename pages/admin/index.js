import AdminContainer from "../../components/AdminPage";
import sql from "../../database/connection";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkLogin } from "../../utility";
import { setActiveStudent } from "../../redux/features/app-slice";
const Admin = ({  allCohorts }) => {

  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
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
        <AdminContainer allCohorts={allCohorts} />
      </div>
    )
  );
};

export default Admin;

export const getStaticProps = async () => {

  const allCohorts = await sql`SELECT * FROM cohorts ORDER BY cohort_id ASC;`;
  return {
    props: {
      allCohorts,
    },
  };
};
