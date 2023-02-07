import style from "../../../styles/LoginStyles.module.css";
import RegisterModal from "../RegisterModal";
import { useContext } from "react";
import { appContext } from "../../../pages/_app";

const LoginHeader = () => {
  const { showRegisterModal, setShowRegisterModal } = useContext(appContext);

  return (
    <>
      <header className={style.header}>
        {/* --------------------------- HEADER BANNER IMAGE -------------------------- */}
        <picture className={style.galvanize_banner}>
          <img
            src="https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png"
            alt="Galvanize Homepage Logo"
            className={style.galvanize_logo}
            href="https://www.galvanize.com/"
            onClick={() => {
              window.location.assign("https://www.galvanize.com/");
            }}
          />
        </picture>
        {/* ---------------------------------- NAVBAR --------------------------------- */}
        <nav className={style.navbar}>
          <div className={style.list_of_resources}>
            <label className={style.resources_label}>Resources: </label>
            <a
              className={style.resource}
              href="https://auth.galvanize.com/sign_in"
            >
              <span className={style.resource_btn}>{"L E A R N"}</span>
            </a>
            <a
              className={style.resource}
              href="https://www.military-transition.org/resources.html"
            >
              <span className={style.resource_btn}>
                {"Military Transistion"}
              </span>
            </a>
            <a className={style.resource} href="https://www.hireheroesusa.org/">
              <span className={style.resource_btn}>{"Hire Heros"}</span>
            </a>
          </div>
          {/* ---------------------------- REGISTER BUTTON ----------------------------- */}
          <button
            className={style.register_button}
            onClick={() => setShowRegisterModal(true)}
          >
            {"Register"}
          </button>
        </nav>
      </header>
      {/* --------------------------------- REGISTER MODAL ----------------------------- */}
      <RegisterModal />
    </>
  );
};

export default LoginHeader;
