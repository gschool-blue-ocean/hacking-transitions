import React from "react";
import styles from "../../styles/GlobalContainer.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const session = sessionStorage.getItem("currentUser")
    setCurrentUser(JSON.parse(session));
  }, []);
  return (
    <div className={styles.container}>
      {currentUser && <Header currentUser={currentUser} />}
      {children}
      {currentUser && <Footer />}
    </div>
  );
};

export default Layout;
