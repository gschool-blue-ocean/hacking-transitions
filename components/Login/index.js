import { useState } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../../styles/LoginStyles.module.css";
import { setActiveStudent } from "../../redux/features/app-slice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
//import firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
//import config firebasee key
const config = require('./config');

let Login = () => {
  const firebaseConfig = {
    apiKey: config.REACT_APP_APIKEY,
    authDomain: config.REACT_APP_AUTHDOMAIN,
    projectId: config.REACT_APP_PROJECTID,
    storageBucket: config.REACT_APP_STORAGEBUCKET,
    messagingSenderId: config.REACT_APP_MESSAGINGSENDERID,
    appId: config.REACT_APP_APPID,
    measurementId: config.REACT_APP_MEASUREMENTID,
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
        // .then((user) => {
        //   if (user.password === inputData.password) {
        //     signInWithEmailAndPassword(auth,inputData.username,user.password)
        //     .then((userCredential)=>{
        //       const user = userCredential.user;
        //       console.log(user)
        //     })
        //     stayLogged &&
        //       localStorage.setItem("currentUser", JSON.stringify(user));
        //     sessionStorage.setItem("currentUser", JSON.stringify(user));
        //   } else {
        //     throw new Error("Not Found");
        //   }
        //   user.admin
        //     ? (router.push("/admin"), setLoginData(""))
        //     : (router.push("/student"),
        //       dispatch(setActiveStudent(user)),
        //       setLoginData(""));
        // })
          signInWithEmailAndPassword(auth,inputData.email,inputData.password)
          .then((userCredential)=>{
            console.log('user done configure')
            const currentUser = userCredential.user;
            console.log(currentUser)

            stayLogged &&
            localStorage.setItem("currentUser", JSON.stringify(user));
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          })
          .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            console.log(errorCode,errorMessage);
          })

        user.admin
          ? (router.push("/admin"), setLoginData(""))
          : (router.push("/student"),
            dispatch(setActiveStudent(user)),
            setLoginData(""));
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
      {/* <div className={style.picCont}> */}
      {/* </div> */}
      <div className={style.loginContainer}>
        <h1 className={style.loginTitle}>Hacking Transition</h1>
        {error && (
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Username/Password is Incorrect
          </span>
        )}

        <form className={style.loginForm} onSubmit={handleLogin}>
          <span>
            <label htmlFor="username" className={style.label}>
              Username
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
          <button id="submit" type="submit" className={style.loginBtn}>
            LOG IN <CgEnter />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
