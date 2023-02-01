import style from "../../../styles/LoginStyles.module.css";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";

const LoginLayout = ({ children }) => {
  return (
    <div className={style.login_layout_container}>
      <LoginHeader />
      {children}
      <LoginFooter />
    </div>
  );
};

export default LoginLayout;
