import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Meta from "../components/Meta";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/LoginStyles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(5);

  const contextData = {
    showRegisterModal,
    setShowRegisterModal,
    showUpdateModal,
    setShowUpdateModal,
    currentFirebaseUser,
    setCurrentFirebaseUser,
    isLoading,
    setIsLoading,
    loginAttempts,
    setLoginAttempts,
  };

  return Component.displayName === "Login" ? (
    <appContext.Provider value={{ ...contextData }}>
      <Provider store={store}>
        <Meta />
        <Component {...pageProps} />
      </Provider>
    </appContext.Provider>
  ) : (
    <appContext.Provider value={{ ...contextData }}>
      <Provider store={store}>
        <Meta />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </appContext.Provider>
  );
}

export const appContext = React.createContext();
export default MyApp;
