import {useState} from "react";
import style from "../../../styles/LogInNew/LoginUI.module.css";
import RegisterModal from "../Register";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <header className={style.headerN}>
      <img className={style.galvanizeLogo} src="https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png" alt="Galvanize Logo" />
        <div className={style.overlapGroup3}>
          <div className={style.orangeAccent}>
            <h1 className={style.title}>Hacking Transition</h1>
          </div>
        </div>
    </header>
  );
};

export default Header;
