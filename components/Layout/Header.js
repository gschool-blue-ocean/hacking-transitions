import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import style from "../../styles/LoginNew/Loginui.module.css";

const Header = ({ currentUser }) => {
  const router = useRouter();
  const { pathname } = router;
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
