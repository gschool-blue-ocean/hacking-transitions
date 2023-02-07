import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import UserLogin from "../components/LoginPage/index";
import LoginLayout from "../components/LoginPage/LoginLayout";
import LoadingScreen from "./loading";
import { appContext } from "./_app";

//=========================  LOGIN PAGE ==================

function Home() {
  const { isLoading, setIsLoading } = useContext(appContext);
  const router = useRouter();

  useEffect(() => {
    // this useEffect checks if a currentUser exists in session storage:
    // if user exists, redirect to appropriate page (student or admin)
    if (window) {
      let sessionUser = window.sessionStorage.getItem("currentUser");
      console.log("sessionStorage: ", sessionStorage);
      console.log("sessionUser: ", JSON.parse(sessionUser));
      if (sessionUser !== null) {
        setIsLoading(true);
        sessionUser = JSON.parse(sessionUser);
        sessionUser.admin ? router.push("/admin") : router.push("/student");
      }
    }
  }, []);

  return (
    <>
      <LoginLayout>{isLoading ? <LoadingScreen /> : <UserLogin />}</LoginLayout>
    </>
  );
}

Home.displayName = "Login";
export default Home;
