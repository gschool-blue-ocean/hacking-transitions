
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import Chat from '../components/Chat'
import { server } from "../utility";

import Login from "../components/login";

import { setAllUserData, setAllCohortData } from "../redux/features/app-slice";


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

 
  
  return (
    <div className={styles.container}>
<<<<<<< HEAD
      
=======
      <Login />
      <Chat />

>>>>>>> 091f4dd524a0e86087c5cbcd7f4d97b22d54bef3
    </div>
  );
}
