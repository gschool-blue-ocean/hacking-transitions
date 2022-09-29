<<<<<<< HEAD
import "../styles/globals.css";
import store from "../redux";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />{" "}
    </Provider>
  );
}

export default MyApp;
=======
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
>>>>>>> 6f19e8c (initial commit)
