import React from "react";
import style from "../../../styles/LoginStyles.module.css";

const LoginFooter = () => {
  return (
    <div className={style.footer}>
      <div className={style.copyright}>
        <small>© 2013 - 2023 Galvanize, Inc.</small>
      </div>
      <div className={style.footer_links}>
        <a className={style.link} href="https://www.galvanize.com/privacy">
          Privacy Policy
        </a>
        <a className={style.link} href="https://www.galvanize.com/terms-of-use">
          Terms of Use
        </a>
        <a
          className={style.link}
          href="https://www.galvanize.com/regulatory-information"
        >
          Regulatory Information
        </a>
        <a className={style.link} href="https://www.galvanize.com/outcomes">
          Outcomes
        </a>
        <a
          className={style.lastLink}
          href="https://www.tfaforms.com/4794969?_ga=2.107592388.719091361.1664475274-961043702.1644711180"
          target="..."
        >
          Do Not Sell My Personal Information
        </a>
      </div>
    </div>
  );
};

export default LoginFooter;
