import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Meta  from "../components/meta";
import styles from "../styles/GlobalContainer.module.css"
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Meta />
      <div className={styles.container}>
       <Component {...pageProps} />{" "}
      </div>
    </Provider>
  );
}

export default MyApp;
