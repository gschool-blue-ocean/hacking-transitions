import React from "react";
import style from "../../styles/Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const currentUser = useSelector(({ app: { currentUser } }) => ({
    currentUser,
  }));

  return (
    <nav className={style.header}>
      <div className={style.topNav}>
        <ul className={style.topList}>
          <div className={style.listItem}>
            {currentUser.first + currentUser.last}
          </div>
          <div className={style.listItem}>
            <a href={"/Logout"}>Logout</a>
          </div>
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
