import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const session = sessionStorage.getItem("currentUser");
    setCurrentUser(JSON.parse(session));
  }, []);

  return (
    <>
      {currentUser && <Header currentUser={currentUser} />}
      {children}
      {currentUser && <Footer />}
    </>
  );
};

export default Layout;
