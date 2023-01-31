import EditStudentModal from "../../components/StudentPage/EditStudentModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkLogin } from "../../utility";
import { setActiveStudent } from "../../redux/features/app-slice";
function EditStudent(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
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
      <>
        <EditStudentModal />
      </>
    )
  );
}

export default EditStudent;
