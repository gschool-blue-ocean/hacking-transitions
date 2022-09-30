import React from "react";
import style from "../../styles/Header.module.css";
import Logo from "./galvanizeLogo.svg";

const Header = () => {
  return (
    <header className={style.header}>
      header
      <div className={style.imageContainer}>
        <img src={Logo} alt="galvanizaeLogo" className={style.logo}></img>
      </div>
    </header>
  );
};

export default Header;
