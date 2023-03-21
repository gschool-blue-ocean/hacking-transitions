import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/TopLevel.module.css"
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const session = sessionStorage.getItem("currentUser");
    setCurrentUser(JSON.parse(session));
  }, []);

  return (
    <div className={styles.TopLevel}>
      {currentUser && <Header currentUser={currentUser} />}
      <div className={styles.midLevel}>
      {children}
      </div>
      {currentUser && <Footer />}
    </div>
  );
};

export default Layout;
