import style from "../../styles/LoginStyles.module.css";
import { useState, useContext } from "react";
import { setActiveStudent } from "../../redux/features/app-slice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { appContext } from "../../pages/_app";
import LoginFooter from "./LoginLayout/LoginFooter";
import axios from 'axios'

let UserLogin = () => {
  const {
    currentFirebaseUser,
    setCurrentFirebaseUser,
    setIsLoading,
    loginAttempts,
    setLoginAttempts,
  } = useContext(appContext);
  let stayLogged = false;
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (e) => {
    if (loginData.password.length < 5) {
      e.preventDefault();
      return setError("Password must be 6+ characters");
    }
  
    e.preventDefault();
  
    try {
      const res = await (axios.get(`/api/users/${loginData.email}`));
      // console.log('res', res)
  
  
      const user = res.data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      setIsLoading(true);
      console.log("user done configure");
      await setCurrentFirebaseUser(userCredential.user);
      console.log("currentFirebaseUser: ", currentFirebaseUser);
      console.log("user: ", user);
  
      stayLogged && localStorage.setItem("currentUser", JSON.stringify(user));
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      user.admin
        ? (router.push("/admin"), setLoginData(""))
        : (router.push("/student"),
          dispatch(setActiveStudent(user)),
          setLoginData(""));
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/wrong-password') {
        setLoginAttempts((prevCount) => prevCount - 1);
        setError(
          `Incorrect password... ${loginAttempts} attempts remaining`
        );
      } else if (error.code === 'auth/too-many-requests') {
        setError("Account temporarily locked... try again later");
      } else if (error.code === 'ERR_BAD_REQUEST'){
          return setError("Email does not exists... try again");
      }
    }
  };

  onAuthStateChanged(auth, (user) => {
    // logs if a user is currently logged into firebase
    if (user !== null) {
      console.log("logged in!");
    } else {
      console.log("No User");
    }
  });

  return (
    <main className={style.main}>
      <div className={style.login_container}>
        <div className={style.login_inner_wrapper}>
          <picture className={style.login_logo}>
            <img
              src="https://dotcom-files.s3.us-west-2.amazonaws.com/galvanize_logo_full-color_light-background.png"
              alt="Galvanize Login Logo"
              height="50px"
            />
          </picture>
          <h1 className={style.signin_h1}>Sign In</h1>
          {/* ------------ if error, show alert with error---------------- */}
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
          {/* ----------------------------------------------------------- */}
          <form className={style.loginForm} onSubmit={handleLogin}>
            <span>
              <input
                required
                id="formInput"
                className={style.login_inputs}
                type="text"
                autoComplete="email"
                placeholder="Email address"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </span>
            <span>
              <input
                required
                id="formInput2"
                className={style.login_inputs}
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </span>
            <section className={style.remember_me_container}>
              <span>
                <input
                  type="checkbox"
                  name="stay_logged"
                  id="stay_logged"
                  value={true}
                  className={style.remember_me_box}
                  onClick={() => {
                    stayLogged = !stayLogged;
                  }}
                />
                <label
                  htmlFor="stay_logged"
                  className={style.remember_me_label}
                >
                  {"Remember Me"}
                </label>
              </span>
            </section>
            <button id="submit" type="submit" className={style.loginBtn}>
              {"SIGN IN"}
            </button>
            <div className={style.forgot_pass_wrapper}>
              <label className={style.forgot_pass}>
                {"Forget your password?"}
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UserLogin;
