import Image from "next/image";
import {  useDispatch } from "react-redux";
import { useEffect } from "react";
import { server } from "../utility";
import Login from "../components/Login";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice";
import styles from "../styles/Home.module.css";

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
Home.displayName = "Login";
export default Home;
