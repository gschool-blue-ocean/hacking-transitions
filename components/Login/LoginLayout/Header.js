import React from "react";
import style from "../../../styles/LoginStyles.module.css";
// import Logo from "./galvanizeLogo.svg";

const Header = () => {
  return (
    <nav className={style.header}>
      <div className={style.topNav}>
        <ul className={style.topList}>

          <li className={style.listItem}>Register</li>
        </ul>
      </div>
      <div className={style.bottomNav}>
        <img
          src="https://www.galvanize.com/images/galvanize-logo.svg"
          alt="galvanizaeLogo"
          className={style.logo}
        ></img>
       
        <div className={style.pages}>
          <ul className={style.bottomList}>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
