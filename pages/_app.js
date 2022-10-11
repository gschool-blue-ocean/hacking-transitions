import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Meta from "../components/Meta";
import Layout from "../components/Layout";
import CheckLogin from "../components/Login/checkLogin";
function MyApp({ Component, pageProps }) {
  return Component.displayName === "Login" ? (
    <Provider store={store}>
      <Meta />
<<<<<<< HEAD

      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
=======
      <Component {...pageProps} />{" "}
>>>>>>> b8558cde58d6a5bc59331e14d993af5714141b5a
    </Provider>
  ) : (
    <Provider store={store}>
      <Meta />
      <Layout>
        <CheckLogin />
        <Component {...pageProps} />{" "}
      </Layout>
    </Provider>
  );
}

export default MyApp;
