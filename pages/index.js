import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Login from "../components/Login";

import { setActiveStudent } from "../redux/features/app-slice";

//=========================  LOGIN PAGE ==================

function Home() {
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

  const confirmStorageUser = async (currentUser, local = false) => {
    const currentUserObj = JSON.parse(currentUser);
    const user = await (
      await fetch(`/api/users/${currentUserObj.username}`)
    ).json();
    if (user.password === currentUserObj.password) {
      local && localStorage.setItem("currentUser", JSON.stringify(user));
      window.sessionStorage.setItem("currentUser", JSON.stringify(user));
      user.admin ? router.push("/admin") : router.push("/student"),
        dispatch(setActiveStudent(user));
    }
  };
  return (
    <>
      <Login />
    </>
  );
}
Home.displayName = "Login";
export default Home;
