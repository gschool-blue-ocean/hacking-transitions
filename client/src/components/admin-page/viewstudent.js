import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import style from "../../styles/viewStudent.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudentPage from "../../components/StudentPage";
import { setActiveStudent } from "../../redux/features/app-slice";
import { checkLogin } from "../../utility";
import sql from "../../database/connection";

//******FOR VIEWING STUDENT INFORMATION WHILE LOGGED IN AS AN ADMIN ***********/

const ViewStudent = ({ cohortStudents }) => {
  const { activeStudent } = useSelector(({ app: { activeStudent } }) => ({
    activeStudent,
  }));
  const [admin, setAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    console.log(cohortStudents);
    const sessionStudent = JSON.parse(sessionStorage.getItem("activeStudent"));
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
        dispatch(
          setActiveStudent(sessionStudent)
        );
      }
    })();

    for (let i = 0; i < cohortStudents.length; i++) {
      const student = cohortStudents[i];
      if (student.user_id === sessionStudent.user_id) {
        console.log(i, "index of active studnt");

        setCurrentStudentIndex(i);
        break;
      }
    }
  }, []);

  const handleNav = (e) => {
    const i = currentStudentIndex;
    if (e.target.name === "prev" && i > 0) {
      setCurrentStudentIndex(i - 1);
      dispatch(setActiveStudent(cohortStudents[i - 1]));
    } else if (e.target.name === "next" && i < cohortStudents.length - 1) {
      setCurrentStudentIndex(i + 1);
      dispatch(setActiveStudent(cohortStudents[i + 1]));
    }
  };

  const handleChange = (e) => {
    setSearch((searchData) => {
      return {
        ...searchData,
        [e.target.name]: e.target.value,
      };
    });
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputData = {
      first: search.first,
      last: search.last,
    };
    setSearch("");
    e.target.reset();

    fetch(`/api/users/students/${inputData.last}`)
      .then((res) => {
        if (res.status === 404) throw new Error("User Not Found!");
        return res.json();
      })
      .then((user) => {
        if (user.first === inputData.first) {
          if (user.admin) throw new Error("User is Admin");
          dispatch(setActiveStudent(user));
          // sessionStorage.setItem("activeStudent", JSON.stringify(user));
        } else {
          throw new Error("User Not Found!");
        }
      })
      .catch(({ message }) => {
        setError(true);
      });
  };

  return (
    admin && (
      <div className={style.container}>
        <div className={style.top}>
          {currentStudentIndex > 0 ? (
            <button name="prev" className={style.prev} onClick={handleNav}>
              Previous
            </button>
          ) : (
            <div className={style.btnSpace}></div>
          )}
          <div className={style.spacer}></div>
          <div className={style.cohort}>{activeStudent.cohort_name}</div>
          <div className={style.searchdiv}>
            Search Students
            <form className={style.search} onSubmit={handleSubmit}>
              <input
                name="first"
                className={style.input}
                placeholder="First Name"
                onChange={handleChange}
              ></input>
              <input
                name="last"
                className={style.input}
                placeholder="Last Name"
                onChange={handleChange}
              ></input>
              <input className={style.submit} type="submit" />
            </form>
          </div>
          {currentStudentIndex < cohortStudents.length - 1 ? (
            <button name="next" className={style.next} onClick={handleNav}>
              Next
            </button>
          ) : (
            <div className={style.btnSpace}></div>
          )}
        </div>
        <div className={style.card}>
          <StudentPage />
        </div>
      </div>
    )
  );
};

export default ViewStudent;

export async function getServerSideProps({ query: { id } }) {
  const cohortStudents =
    await sql` SELECT * FROM users WHERE cohort_id=${id} ORDER BY first ASC`;


  return { props: { cohortStudents } };
}
