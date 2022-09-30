import React from "react";
import style from "../../styles/Header.module.css";
// import Logo from "./galvanizeLogo.svg";

const Header = () => {
  return (
    <nav className={style.header}>
      <div className={style.topNav}>
        <ul className={style.topList}>
          <li className={style.listItem}>UserName</li>
          <li className={style.listItem}>Logout</li>
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
