import AdminContainer from "../../components/AdminPage";
import sql from "../../database/connection";
import { useEffect, useState, useContext } from "react";
import { appContext } from "../_app";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkLogin } from "../../utility";
import { setActiveStudent } from "../../redux/features/app-slice";
// import { set } from "immer/dist/internal";

const Admin = ({ allCohorts }) => {
  const { isLoading, setIsLoading } = useContext(appContext);
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  setIsLoading(false);

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
  const allCohorts =
    await sql`SELECT * FROM cohorts WHERE archived = false ORDER BY cohort_id ASC;`;
  return {
    props: {
      allCohorts,
    },
  };
};
