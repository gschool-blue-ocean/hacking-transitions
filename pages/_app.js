import "../styles/globals.css";
import store from "../redux";
import { Provider } from "react-redux";
import styles from "../styles/GlobalContainer.module.css"
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className={styles.className}>
      <Component {...pageProps} />{" "}
      </div>
    </Provider>
  );
}

export default MyApp;

