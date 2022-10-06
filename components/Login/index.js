import React, { useState, useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../../styles/LoginStyles.module.css";
import { server } from "../../utility";
import {
  setCurrentUser,
  setLoginState,
  setActiveStudent,
} from "../../redux/features/app-slice.js";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import axios from "axios";

// i need to revise this so much
let Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { allUsersData } = useSelector(
  //   ({ app: { allUsersData } }) => ({
  //     allUsersData,
  //   })
  // );
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    // localStorage.clear()
    /*
        Check local storage for a signed in user, if exist sign them in
    */
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const currentUserObj = JSON.parse(currentUser);
      dispatch(setCurrentUser(currentUserObj)); //set Redux currentUser state to equal th euser in local storage
      dispatch(setLoginState(true));
      currentUserObj.admin ? router.push("/admin") : router.push("/student"),
        dispatch(setActiveStudent(currentUserObj));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    let inputData = {
      username: loginData.username,
      password: loginData.password,
    };

    fetch(`${server}/api/users/${inputData.username}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Not Found");
        return res.json();
      })
      .then((user) => {
        console.log(user.password !== inputData.password);

        if (user.password !== inputData.password) throw new Error("Not Found");
        if (
          user.username === inputData.username &&
          user.password === inputData.password
        ) {
          dispatch(setLoginState(true));
          dispatch(setCurrentUser(user));
        }

        if (user.admin === true) {
          router.push("/admin/");
        } else {
          router.push("/student");
        dispatch(setActiveStudent(user));

        }
      })
      .catch(({ message }) => {
        setError(true);
      });
  };

  const handleChange = (e) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // handleHash was here but was commented out;
  return (
    <div className={style.modalContainer}>
      {/* <button onClick={handleHash}>CLICK TO HASH</button> */}

      <div className={style.loginContainer}>
        <h1 className={style.loginTitle}>Hacking Transition</h1>
        {error && (
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Username/Password is Incorrect
          </span>
        )}

        <form className={style.loginForm} onSubmit={handleLogin}>
          <input
            id="formInput"
            className={`${style.loginInputBox} ${style.username}`}
            type="text"
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
          <input
            id="formInput"
            className={style.loginInputBox}
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />

          <button type="submit" className={style.loginBtn}>
            LOG IN <CgEnter />{" "}
          </button>

          {/* <button
                          type='button'
                          className={`${style.loginBtn} ${style.createAccBtn}`}
                          onClick={handleShowCreateAccModal}>Create an Account</button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
