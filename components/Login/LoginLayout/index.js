import React from "react";
import styles from "../../../styles/GlobalContainer.module.css";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
