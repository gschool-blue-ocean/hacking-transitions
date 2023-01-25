import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // return user.admin ? router.push("/admin") : router.push("/student");

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
