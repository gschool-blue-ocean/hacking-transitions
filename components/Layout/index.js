import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import style from "../../styles/LoginNew/LoginUI.module.css";

import { useState, useEffect } from "react";
const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const session = sessionStorage.getItem("currentUser")
    setCurrentUser(JSON.parse(session));
  }, []);
  return (
    // <>
    //   {currentUser && <Header currentUser={currentUser} />}
    //   {children}
    //   {currentUser && <Footer />}
    // </>
    <div className={style.containerCenterHorizontal}>
      <div className={style.desktop1}>
            <div className={style.upperBlur}></div>
              <Header />
              {children}
              <Footer />
            <div className={style.bottomBlur}></div>
      </div>
    </div>
  );
};

export default Layout;
