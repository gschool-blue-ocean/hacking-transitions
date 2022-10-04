<<<<<<< HEAD
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
=======
>>>>>>> 6a5facf9638f2b5def352996a44a242d2c1a33b5
import { useEffect } from "react";
import Chat from '../components/Chat'
import { server } from "../utility";
<<<<<<< HEAD
import Login from "../components/login";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice.js"
=======
import { useSelector, useDispatch } from "react-redux";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice";
import styles from "../styles/Home.module.css";
>>>>>>> 6a5facf9638f2b5def352996a44a242d2c1a33b5
//=========================  LOGIN PAGE ==================
export default function Home() {
  const dispatch = useDispatch();
  const { allUsersData, allCohortsData } = useSelector(
    ({ app: { allUsersData, allCohortsData } }) => ({
      allUsersData,
      allCohortsData,
    })
  );

  useEffect(() => {
    (async () => {
      const allUsers = await (await fetch(`${server}/api/users`)).json();
      const allCohorts = await (await fetch(`${server}/api/cohorts`)).json();
      dispatch(setAllUserData(allUsers));
      dispatch(setAllCohortData(allCohorts));
    })();
  }, []);
<<<<<<< HEAD
 
  
  return (
    <div className={styles.container}>
      <Login />
=======

  
  return (
    <div className={styles.container}>
      <Chat />
>>>>>>> 6a5facf9638f2b5def352996a44a242d2c1a33b5
    </div>
  );
}
