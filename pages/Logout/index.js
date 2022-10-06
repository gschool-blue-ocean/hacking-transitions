import React, { useEffect } from "react";
import style from "../../styles/Logout.module.css";
import { useDispatch } from "react-redux";
import { setLoginState, setCurrentUser } from "../../redux/features/app-slice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("currentUser");
    dispatch(setLoginState(false));
    dispatch(setCurrentUser({}));
  }, []);
  //   return (
  // <div className={style.container}>
  //   <a href="/" className={style.words}>
  //     Return to Homepage
  //   </a>
  // </div>
  //   );
};

export default Logout;
