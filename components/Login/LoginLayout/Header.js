import React from "react";
import style from "../../../styles/LoginStyles.module.css";
// import Logo from "./galvanizeLogo.svg";

const Header = () => {
  return (
    <nav className={style.header}>
      <div className={style.reasources_container}>
       
      </div>

        {/* this is where the logo is taking you to galvanize official website */}
      <div className={style.bottomNav}>
        
        <a href="https://www.galvanize.com/">
          <img
            src="https://www.galvanize.com/images/galvanize-logo.svg"
            alt="galvanizaeLogo"
            className={style.logo}
          ></img>
        </a>
        <div className={style.pages}>
          <ul className={style.bottomList}>
          </ul>
        </div>
      </div>
      {/* /////////////////////////////////////////////////////////////////////////////// */}

      {/* this is the register button */}
      <div className={style.topNav}>
      <ul className={style.list_of_resources}>
          <label className={style.resources_label}>resources: </label>
          <a className={style.learn} href="https://auth.galvanize.com/sign_in">L E A R N</a>
          <a className={style.mil_resources} href="https://www.military-transition.org/resources.html">Military Transistion</a>
          <a className={style.hire_heros} href="https://www.hireheroesusa.org/">Hire For Heros</a>
          </ul>
        <ul className={style.topList}>
          <li className={style.listItem}>Register</li>
        </ul>
      </div>
      {/* /////////////////////////////////////////////////////////////////////////////////////// */}

    </nav>
  );
};

export default Header;
