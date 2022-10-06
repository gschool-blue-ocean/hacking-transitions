import React from "react";
import style from "../../styles/Header.module.css";
import {
  setLoginState,
  setCurrentUser,
  setActiveStudent,
} from "../../redux/features/app-slice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector(({ app: { currentUser } }) => ({
    currentUser,
  }));

  const logout = () => {
    // localStorage.removeItem("currentUser");
    dispatch(setLoginState(false));
    dispatch(setCurrentUser({}));
  };

  return (
    <nav className={style.header}>
      <div className={style.topNav}>
        <ul className={style.topList}>
          <li className={style.listItem}>
            {currentUser.first + currentUser.last}
          </li>
          <li className={style.listItem} onClick={logout()}>
            Logout
          </li>
        </ul>
      </div>
      <div className={style.bottomNav}>
        <img
          src="https://www.galvanize.com/images/galvanize-logo.svg"
          alt="galvanizaeLogo"
          className={style.logo}
        ></img>
        <h1 className={style.title}>Hacking Transitions</h1>
        <div className={style.pages}>
          <ul className={style.bottomList}>
            <li className={style.page}>Home</li>
            <li className={style.page}>Archive</li>
            <li className={style.page}>Admin</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
