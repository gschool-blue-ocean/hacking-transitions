import StudentPage from "../../components/StudentPage";
import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkLogin } from "../../utility";
import { setActiveStudent } from "../../redux/features/app-slice";
import { appContext } from "../_app";

const Student = () => {
  const { isLoading, setIsLoading } = useContext(appContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  setIsLoading(false); // CAUSING ERROR WHEN LOADING STUDENT PAGE

  useEffect(() => {
    (async () => {
      const user = await checkLogin();
      console.log(user);

      !user ? router.push("/") : setLoggedIn(true);
      user === "student" &&
        dispatch(
          setActiveStudent(JSON.parse(sessionStorage.getItem("currentUser")))
        );
    })();
  }, []);

  return (
    loggedIn && (   
        <StudentPage />
    )
  );
};

export default Student;
