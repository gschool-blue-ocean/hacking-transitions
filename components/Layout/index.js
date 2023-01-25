import React from "react";

import Header from "../Login/LoginLayout/Header";
import Footer from "../Login/LoginLayout/Footer";
import style from "../../styles/LogInNew/Loginui.module.css";

import { useState, useEffect } from "react";
const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const session = sessionStorage.getItem("currentUser")
    setCurrentUser(JSON.parse(session));
  }, []);
  return (
    <div className={style.containerCenterHorizontal}>
      <div className={style.desktop1}>
            <div className={style.upperBlur}></div>
            {currentUser && <Header currentUser={currentUser} />}
            {children}
            {currentUser && <Footer />}
            <div className={style.bottomBlur}></div>
      </div>
    </div>
  );
};

export default Layout;
