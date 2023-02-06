import React from "react";
import LoginLayout from "../components/LoginPage/LoginLayout";
import style from "../styles/LoginStyles.module.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <LoginLayout>
      <div className={style.notfound}>
        <h1> Ooops...That page cannot be found! </h1>
        <h2>Please contact your administrator</h2>
        <h3>
          Go back to the{" "}
          <Link href="/">
            <a>Homepage</a>
          </Link>
        </h3>
      </div>
    </LoginLayout>
  );
};

export default NotFound;
