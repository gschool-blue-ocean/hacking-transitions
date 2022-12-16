import React from "react";
import Layout from "../components/Login/LoginLayout";
import style from "../styles/LoginStyles.module.css"

import Link from 'next/link'

const NotFound = () => {
  return (
    <Layout>
    <div className= {style.notfound}>
      <h1> Ooops...That page cannot be found! </h1>
      <h2>Please contact your administrator</h2>
      <h3>Go back to the <Link href="/"><a>Homepage</a></Link></h3>
    </div>
    </Layout>
  );
}
 
export default NotFound;