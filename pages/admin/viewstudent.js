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
  const [search, setSearch] = useState("");
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

  const handleNav = (e) => {
    e.preventDefault();
    let id = activeStudent.user_id;
    e.target.name === "prev" ? id-- : id++;

    fetch(`/api/users/${id}`)
      .then((res) => {
        if (res.status === 404) throw new Error("User Not Found!");
        return res.json();
      })
      .then((user) => {
        if (user.admin) {
          return;
        } else {
          dispatch(setActiveStudent(user));
          // sessionStorage.setItem("activeStudent", JSON.stringify(user));
        }
      })
      .catch(({ message }) => {
        setError(true);
      });
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
          <button name="prev" className={style.prev} onClick={handleNav}>
            Previous
          </button>
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
          <button name="next" className={style.next} onClick={handleNav}>
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
