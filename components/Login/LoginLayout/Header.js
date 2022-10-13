import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import style from "../../../styles/LoginStyles.module.css";
import Register from "./register";
// import Logo from "./galvanizeLogo.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

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


      <div className={style.topNav}>
      <ul className={style.list_of_resources}>
          <label className={style.resources_label}>resources: </label>
          <a className={style.learn} href="https://auth.galvanize.com/sign_in">L E A R N</a>
          <a className={style.mil_resources} href="https://www.military-transition.org/resources.html">Military Transistion</a>
          <a className={style.hire_heros} href="https://www.hireheroesusa.org/">Hire For Heros</a>
          </ul>

                {/* this is the register button */}
        <ul className={style.topList}>
            <div onClick={() => setIsOpen(true)}>Register</div>
            <Register  open={isOpen} onClose={() => setIsOpen(false)}> this is a test</Register>

        </ul>
      </div>
      {/* /////////////////////////////////////////////////////////////////////////////////////// */}

    </nav>
  );
};

export default Header;
