import React from "react";
import style from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <div className={style.cont}>
          <div className={style.col}>
            <small>© 2022 Galvanize, All rights reserved.</small>
          </div>
          <div className={style.links}>
            <ul className={style.list}>
              <li>
                <a
                  className={style.link}
                  href="https://www.galvanize.com/privacy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className={style.link}
                  href="https://www.galvanize.com/terms-of-use"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  className={style.link}
                  href="https://www.galvanize.com/regulatory-information"
                >
                  Regulatory Information
                </a>
              </li>
              <li>
                <a
                  className={style.link}
                  href="https://www.galvanize.com/outcomes"
                >
                  Outcomes
                </a>
              </li>
              <li>
                <a
                  className={style.lastLink}
                  href="https://www.tfaforms.com/4794969?_ga=2.107592388.719091361.1664475274-961043702.1644711180"
                >
                  Do Not Sell My Personal Information
                </a>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </>
  );
};

export default Footer;
