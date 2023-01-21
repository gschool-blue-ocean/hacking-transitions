import { useState } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../../styles/LoginStyles.module.css";
import { setActiveStudent } from "../../redux/features/app-slice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
//import firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import config firebasee key
// const config = require('./config');

let Login = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBNDQyZHitCAjyupnVxNzU1YKfI4zBOMss",
    authDomain: "hackingtransitions-development.firebaseapp.com",
    projectId: "hackingtransitions-development",
    storageBucket: "hackingtransitions-development.appspot.com",
    messagingSenderId: "473992713297",
    appId: "1:473992713297:web:68e712395d1ccf79c49470",
  };
  //Initialize Firebase
  // const app=getApps().length===0?initializeApp(firebaseConfig):getApp();
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  let stayLogged = false;

  const handleLogin = (e) => {
    e.preventDefault();
    let inputData = {
      email: loginData.email,
      password: loginData.password,
    };

    fetch(`/api/users/${inputData.email}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Not Found");
        return res.json();
      })
      .then((user) => {
        signInWithEmailAndPassword(auth, inputData.email, inputData.password)
          .then((userCredential) => {
            console.log("user done configure");
            const currentUser = userCredential.user;
            console.log(currentUser);

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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
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
    <div className={style.mainStage}>
    <div className={style.subBar}>
        <div className={style.resources}>
          Resources:
          <div className="source1">LEARN</div>
          <div>|</div>
          <div className="source2">Military Transition</div>
          <div>|</div>
          <div className="source3">Hire For Heroes</div>
        </div>
        <div className={style.overlapGroup2}>
          <div className={style.signUp}>Sign Up</div>
        </div>

      </div>
      <div className={style.loginContainer}>
      <div className={style.loginFormContainer}>

        <h1 className={style.loginTitle}>Sign In</h1>
        {error && (
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Email/Password is Incorrect
          </span>
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
              id="formInput"
              className={style.input}
              type="password"
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
        </form>
          <button id="submit" type="submit" className={style.loginBtn}>
            LOG IN <CgEnter />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
