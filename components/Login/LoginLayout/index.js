import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Header";
import Footer from "./Footer";
import style from "../../../styles/LogInNew/Loginui.module.css";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // return user.admin ? router.push("/admin") : router.push("/student");

  return (
    <div className={style.containerCenterHorizontal}>
      <div className={style.desktop1}>
            <div className={style.upperBlur}></div>
              <Header />
              {children}
              <Footer />
            <div className={style.bottomBlur}></div>
      </div>
    </div>
  );
};

export default Layout;
