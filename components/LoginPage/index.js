import style from "../../styles/LoginStyles.module.css";
import { useState, useContext } from "react";
import { CgEnter } from "react-icons/cg";
import { setActiveStudent } from "../../redux/features/app-slice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Container, Button, Card, Form, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { appContext } from "../../pages/_app";
import LoginFooter from "./LoginLayout/LoginFooter";

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
    if (loginData.password.length < 6) {
      e.preventDefault();
      return setError("Password must be 6+ characters");
    }

    e.preventDefault();

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
            if (error.code === "auth/wrong-password") {
              setLoginAttempts((prevCount) => prevCount - 1);
              setError(
                `Incorrect password... ${loginAttempts} attempts remaining`
              );
            } else if (error.code === "auth/too-many-requests") {
              setError("Account temporarily locked... try again later");
            }
          });
      });
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
        <h1 className={style.loginTitle}>Hacking Transition</h1>
        {/* <picture className={style.login_logo}>
          <img
            src="https://dotcom-files.s3.us-west-2.amazonaws.com/galvanize_logo_full-color_light-background.png"
            alt="Galvanize Login Logo"
            height="50px"
          />
        </picture> */}
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
    </main>
  );
};

export default UserLogin;
