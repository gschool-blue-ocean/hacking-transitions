import { useState, useContext } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../../styles/LoginStyles.module.css";
import { setActiveStudent } from "../../redux/features/app-slice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { initializeApp, getApps, getApp } from "firebase/app";
import { Container, Button, Card, Form, Alert } from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { appContext } from "../../pages/_app";
import LoadingScreen from "../../pages/loading";

let Login = () => {
  const {
    currentFirebaseUser,
    setCurrentFirebaseUser,
    isLoading,
    setIsLoading,
    loginAttempts,
    setLoginAttempts,
  } = useContext(appContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState(false);
  const [error, setError] = useState("");
  let stayLogged = false;

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      console.log("logged in!");
    } else {
      console.log("No User");
    }
  });

  const handleLogin = async (e) => {
    if (loginData.password.length < 6) {
      e.preventDefault();
      return setError("Password must be 6+ characters");
    }
    // try {
    //   e.preventDefault();
    //   setError("");
    //   setIsLoading(true);
    //   console.log("attempting sign in");

    //   await fetch(`/api/users/${loginData.email}`)
    //     .then((res) => {
    //       if (res.status === 404) throw new Error("Not Found");
    //       return res.json();
    //     })
    //     .then((user) => {
    //       signInWithEmailAndPassword(
    //         auth,
    //         loginData.email,
    //         loginData.password
    //       ).then(async (userCredential) => {
    //         console.log("user done configure");
    //         await setCurrentFirebaseUser(userCredential.user);
    //         console.log("currentFirebaseUser: ", currentFirebaseUser);
    //         console.log("user: ", user);
    //         // const currentUser = userCredential.user;
    //         // console.log(currentUser);

    //         stayLogged &&
    //           localStorage.setItem("currentUser", JSON.stringify(user));
    //         sessionStorage.setItem("currentUser", JSON.stringify(user));
    //         user.admin
    //           ? (router.push("/admin"), setLoginData(""))
    //           : (router.push("/student"),
    //             dispatch(setActiveStudent(user)),
    //             setLoginData(""));
    //       });
    //       // .catch((error) => {
    //       //   const errorCode = error.code;
    //       //   const errorMessage = error.message;
    //       //   console.log(errorCode, errorMessage);
    //       // });
    //     });
    // } catch (error) {
    //   setError("Failed to login");
    //   console.log(error.code, error.message);
    // }

    // setIsLoading(true);

    e.preventDefault();
    // let inputData = {
    //   email: loginData.email,
    //   password: loginData.password,
    // };

    await fetch(`/api/users/${loginData.email}`)
      .then((res) => {
        if (res.status === 404) {
          return setError("Email does not exists... try again");
        }
        return res.json();
      })
      .then((user) => {
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(async (userCredential) => {
            setIsLoading(true);
            console.log("user done configure");
            await setCurrentFirebaseUser(userCredential.user);
            console.log("currentFirebaseUser: ", currentFirebaseUser);
            console.log("user: ", user);
            // const currentUser = userCredential.user;
            // console.log(currentUser);

            stayLogged &&
              localStorage.setItem("currentUser", JSON.stringify(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            user.admin
              ? (router.push("/admin"), setLoginData(""))
              : (router.push("/student"),
                dispatch(setActiveStudent(user)),
                setLoginData(""));
          })
          .catch((error) => {
            console.log(error.code);
            // setIsLoading(false);
            if (error.code === "auth/wrong-password") {
              setLoginAttempts((prevCount) => prevCount - 1);
              setError(
                `Incorrect password... ${loginAttempts} attempts remaining`
              );
            } else if (error.code === "auth/too-many-requests") {
              setError("Account temporarily locked... try again later");
            }
            // setError("Failed to login with email & password");
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log(error.code);
            // console.log(error.code, error.message);
          });
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
      {/* <div className={style.picCont}> */}
      {/* </div> */}
      <div className={style.loginContainer}>
        <h1 className={style.loginTitle}>Hacking Transition</h1>
        {/* {error && (
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Email/Password is Incorrect
          </span>
        )} */}
        {error && (
          <Alert
            variant="danger"
            style={{
              textAlign: "center",
            }}
          >
            {error}
          </Alert>
        )}
        <form className={style.loginForm} onSubmit={handleLogin}>
          <span>
            <label htmlFor="username" className={style.label}>
              Email
            </label>
            <input
              required
              id="formInput"
              className={`${style.input} ${style.username}`}
              type="text"
              autoComplete="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </span>
          <span>
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input
              required
              id="formInput2"
              className={style.input}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </span>
          <span>
            <input
              type="checkbox"
              name="stay_logged"
              id="stay_logged"
              value={true}
              className={style.rememberMe}
              onClick={() => {
                stayLogged = !stayLogged;
              }}
            />{" "}
            <label htmlFor="stay_logged" className={style.label}>
              Remember Me
            </label>
          </span>
          <button id="submit" type="submit" className={style.loginBtn}>
            LOG IN <CgEnter />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
