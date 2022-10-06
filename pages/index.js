import Image from "next/image";
import {  useDispatch } from "react-redux";
import { useEffect } from "react";
import { server } from "../utility";
import styles from '../styles/Home.module.css'
import Login from "../components/Login/index";

import { setAllUserData, setAllCohortData } from "../redux/features/app-slice";

//=========================  LOGIN PAGE ==================

 function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const allUsers = await (await fetch(`${server}/api/users`)).json();
      const allCohorts = await (await fetch(`${server}/api/cohorts`)).json();
      dispatch(setAllUserData(allUsers));
      dispatch(setAllCohortData(allCohorts));
    })();
  }, []);

  return (
    <>
      <Login />
    </>
  );
}
Home.displayName = 'Login'
export default Home