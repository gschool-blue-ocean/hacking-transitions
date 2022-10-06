import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Meta from "../components/Meta";
import Layout from "../components/Layout";
import CheckLogin from "../components/Login/checkLogin";
function MyApp({ Component, pageProps }) {


  return Component.displayName === 'Login' ? 
  (    <Provider store={store}>
    <Meta />

    <Layout>
      <Component {...pageProps} />{" "}
    </Layout>
  </Provider>)
  :
  (
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
