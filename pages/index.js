import Image from "next/image";

import { useEffect } from "react";
import { server } from "../utility";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Login from "../components/Login/index";
import Layout from "../components/Login/LoginLayout";


import {
  setAllUserData,
  setAllCohortData,
  setCurrentUser,
  setLoginState,
  setActiveStudent,
} from "../redux/features/app-slice";

//=========================  LOGIN PAGE ==================

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const allUsers = await (await fetch(`${server}/api/users`)).json();
        const allCohorts = await (await fetch(`${server}/api/cohorts`)).json();
        dispatch(setAllUserData(allUsers));
        dispatch(setAllCohortData(allCohorts));

        /*
          Check local storage for a signed in user, if exist sign them in
      */
        if (window) {
          const localUser = localStorage.getItem("currentUser");
          const sessionUser = window.sessionStorage.getItem("currentUser");
          localUser && confirmStorageUser(localUser,true);
          sessionUser && confirmStorageUser(sessionUser);
        }
      } catch (error) {
        console.error(error.stack);
      }
    })();
  }, []);

  const confirmStorageUser = async (currentUser, local = false) => {
    const currentUserObj = JSON.parse(currentUser);
    const user = await (
      await fetch(`${server}/api/users/${currentUserObj.username}`)
    ).json();
    if (user.password === currentUserObj.password) {
      dispatch(setLoginState(true));
      dispatch(setCurrentUser(user));
      local
        ? localStorage.setItem("currentUser", JSON.stringify(user))
        : window.sessionStorage.setItem("currentUser", JSON.stringify(user));
      user.admin ? router.push("/admin") : router.push("/student"),
        dispatch(setActiveStudent(user));
    }
  };
  return (
    <>
    < Layout >
      <Login />
    </ Layout >
    </>
  );
}
Home.displayName = "Login";
export default Home;
