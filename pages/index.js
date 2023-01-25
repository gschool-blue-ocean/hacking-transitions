import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Login from "../components/Login/index";
import Layout from "../components/Login/LoginLayout";
import LoadingScreen from "./loading";
import { appContext } from "./_app";

import { setActiveStudent } from "../redux/features/app-slice";

//=========================  LOGIN PAGE ==================

function Home() {
  const { isLoading, setIsLoading } = useContext(appContext);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    /*
          Check local storage for a signed in user, if exist sign them in
    */
    if (window) {
      const localUser = localStorage.getItem("currentUser");
      const sessionUser = window.sessionStorage.getItem("currentUser");
      localUser && confirmStorageUser(localUser, true);
      sessionUser && confirmStorageUser(sessionUser);
    }
  }, []);
  // useEffect(() => {
  //   /*
  //         Check local storage for a signed in user, if exist sign them in
  //     */
  //   if (window) {
  //     const localUser = localStorage.getItem("currentUser");
  //     const sessionUser = window.sessionStorage.getItem("currentUser");
  //     localUser && confirmStorageUser(localUser, true);
  //     sessionUser && confirmStorageUser(sessionUser);
  //   }
  // }, []);

  const confirmStorageUser = async (currentUser, local = false) => {
    const currentUserObj = JSON.parse(currentUser);
    console.log("1");
    const user = await (
      await fetch(`/api/users/${currentUserObj.username}`)
    ).json();
    if (user.password === currentUserObj.password) {
      console.log("2");
      local && localStorage.setItem("currentUser", JSON.stringify(user));
      window.sessionStorage.setItem("currentUser", JSON.stringify(user));
      user.admin ? router.push("/admin") : router.push("/student"),
        dispatch(setActiveStudent(user));
    }
  };

  return (
    <>
      <Layout>{isLoading ? <LoadingScreen /> : <Login />}</Layout>
    </>
  );
}

Home.displayName = "Login";
export default Home;
