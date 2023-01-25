import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import style from "../../../styles/LogInNew/LoginUI.module.css";

const Layout = ({ children }) => {
  return (
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
