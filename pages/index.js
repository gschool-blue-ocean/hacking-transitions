import { useEffect } from "react";
import Chat from '../components/Chat'
import { server } from "../utility";
import { useSelector, useDispatch } from "react-redux";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice";
import styles from "../styles/Home.module.css";
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
      
    </div>
  );
}
