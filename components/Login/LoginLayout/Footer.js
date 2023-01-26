import style from "../../../styles/LogInNew/Loginui.module.css";

const Footer = () => {
  return (
    <footer className={style.overlapGroup}>
          <div className={style.copyRight}>© 2023 Galvanize All Rights Reserved</div>
          <div className={style.privacy}>
            <div>Privacy Policy</div>
            <div> | </div>
            <div>Terms of Use</div>
            <div> | </div>
            <div>Regulatory Information</div>
            <div> | </div>
            <div>Outcomes</div>
            <div> | </div>
            <div>Do Not Sell My Personal Information</div>
          </div>
    </footer>

);
};

export default Footer;
