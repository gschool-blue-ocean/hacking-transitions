import "../styles/globals.css";
import "../styles/LoginStyles.module.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Meta from "../components/Meta";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

//^^allows use of bootstrap css across website
function MyApp({ Component, pageProps }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const contextData = {
    showUpdateModal,
    setShowUpdateModal,
    currentFirebaseUser,
    setCurrentFirebaseUser,
    isLoading,
    setIsLoading,
  };

  return Component.displayName === "Login" ? (
    <appContext.Provider value={{ ...contextData }}>
      <Provider store={store}>
        <Meta />
        <Component {...pageProps} />{" "}
      </Provider>
    </appContext.Provider>
  ) : (
    <appContext.Provider value={{ ...contextData }}>
      <Provider store={store}>
        <Meta />
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
      </Provider>
    </appContext.Provider>
  );
}

export const appContext = React.createContext();
export default MyApp;
