import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";

import Meta  from "../components/meta";
import styles from "../styles/GlobalContainer.module.css"
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Meta />

      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>

    </Provider>
  );
}

export default MyApp;
