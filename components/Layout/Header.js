import React, { useEffect } from "react";
import style from "../../styles/Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const getUser = () => {
    const currentUser = useSelector(
      ({ app }) => (currentUser = app.currentUser)
    );
    return `${currentUser.first} ${currentUser.last}`;
  };

  return (
    <nav className={style.header}>
      <div className={style.topNav}>
        <ul className={style.topList}>
          <div className={style.listItem}>Current User</div>
          <a href={"/Logout"} className={style.link}>
            <div className={style.listItem}>Logout</div>
          </a>
        </ul>
      </div>
      <div className={style.bottomNav}>
        <div className={style.picCont}>
          <img
            src="https://www.galvanize.com/images/galvanize-logo.svg"
            alt="galvanizaeLogo"
            className={style.logo}
          ></img>
        </div>
        <h1 className={style.title}>Hacking Transitions</h1>
        <div className={style.pages}>
          <a href="/admin" className={style.link}>
            <li className={style.page}>Home</li>
          </a>
          <a href="/admin/archive" className={style.link}>
            <li className={style.page}>Archive</li>
          </a>
          <a href="/admin/edit" className={style.link}>
            <li className={style.page}>Admin</li>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
