import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import style from "../../styles/viewStudent.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudentPage from "../../components/StudentPage";
import { setActiveStudent } from "../../redux/features/app-slice";
import { checkLogin } from "../../utility";

//******FOR VIEWING STUDENT INFORMATION WHILE LOGGED IN AS AN ADMIN ***********/

const ViewStudent = () => {
  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));
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
  const handleNext = () => {
    console.log("next");
  };

  const handlePrev = () => {
    console.log("prev");
  };

  return (
    admin && (
      <div className={style.container}>
        <div className={style.top}>
          <button className={style.prev} onClick={handlePrev()}>
            Previous
          </button>
          <div className={style.cohort}>{activeStudent.cohort_name}</div>
          <div className={style.search}>Student Search</div>
          <button className={style.next} onClick={handleNext()}>
            Next
          </button>
        </div>
        <div className={style.card}>
          <StudentPage />
        </div>
      </div>
    )
  );
};

export default ViewStudent;
