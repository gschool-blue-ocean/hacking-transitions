import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { server } from "../../utility";
import {
  setAllUserData,
  setAllCohortData,
  setCurrentUser,
  setLoginState,
  setActiveStudent,
} from "../../redux/features/app-slice";
const CheckLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginState } = useSelector(({ app: { loginState } }) => ({
    loginState,
  }));

  useEffect(() => {
    console.log("is logged in ?", loginState);
    
    const localUser = localStorage.getItem("currentUser");
    const sessionUser = window.sessionStorage.getItem("currentUser");
    
    if (!localUser && !sessionUser) {
      router.push("/");
    } else {
      localUser && confirmStorageUser(localUser, true);
      sessionUser && confirmStorageUser(sessionUser);
    }
  }, [loginState]);

  const confirmStorageUser = async (currentUser, local = false) => {
    const currentUserObj = JSON.parse(currentUser);
    const user = await (
      await fetch(`${server}/api/users/${currentUserObj.username}`)
    ).json();
    if (user.password === currentUserObj.password) {
      const allUsers = await (await fetch(`${server}/api/users`)).json();
      const allCohorts = await (await fetch(`${server}/api/cohorts`)).json();
      dispatch(setAllUserData(allUsers));
      dispatch(setAllCohortData(allCohorts));
      dispatch(setLoginState(true));
      dispatch(setCurrentUser(user));
      local
        ? localStorage.setItem("currentUser", JSON.stringify(user))
        : window.sessionStorage.setItem("currentUser", JSON.stringify(user));
      user.admin ? router.push("/admin") : router.push("/student"),
        dispatch(setActiveStudent(user));
    }
  };
  return <></>;
};

export default CheckLogin;
