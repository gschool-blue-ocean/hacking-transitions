import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
<<<<<<< HEAD
import Meta  from "../components/meta";
import styles from "../styles/GlobalContainer.module.css"
=======
import Meta from "../components/Meta";
import Layout from "../components/Layout";
>>>>>>> 6a5facf9638f2b5def352996a44a242d2c1a33b5
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Meta />
<<<<<<< HEAD
      <div className={styles.container}>
       <Component {...pageProps} />{" "}
      </div>
=======
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
>>>>>>> 6a5facf9638f2b5def352996a44a242d2c1a33b5
    </Provider>
  );
}

export default MyApp;
