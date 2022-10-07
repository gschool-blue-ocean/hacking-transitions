import React, { useEffect } from "react";
import style from "../../styles/Logout.module.css";
import { useDispatch } from "react-redux";
import { setLoginState, setCurrentUser } from "../../redux/features/app-slice";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLoginState(false));
    dispatch(setCurrentUser({}));
  };

  useEffect(() => {
    logout();
    localStorage.removeItem("currentUser");
    window.sessionStorage.removeItem("currentUser");
  }, []);
};

export default Logout;
