import React, { useState, useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../styles/LoginStyles.module.css";
import { server } from "../utility";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice.js"
import { useSelector, useDispatch } from "react-redux";



let Login = () => {
    // const [allUsersData] = useState([])
    const dispatch = useDispatch();
    const { allUsersData, allCohortsData } = useSelector(
      ({ app: { allUsersData, allCohortsData } }) => ({
        allUsersData,
        allCohortsData,
      })
    );
    const [userData, setUserData] = useState('')
    const [loginData, setLoginData]=useState({
        username: "",
        password: "",
    }); 

    useEffect(()=>{
        const currentUser = localStorage.getItem('currentUser')
        if(currentUser !== null){
            setUserData(currentUser) // does current user need to be parsed? 
            // they used invokeSetLogin here but im not sure where it came from ; browser says its not defined
        }
    }, [])
    useEffect(() => {
        if(userData){
            // they used invokeSetLogin here but im not sure where it came from ; browser says its not defined
        }
    }, [userData])
    useEffect(() => {
      (async () => {
        const allUsers = await (await fetch(`${server}/api/users`)).json();
        dispatch(setAllUserData(allUsers));
        
      })();
    }, []);
    console.log('all users', allUsersData)
    const handleSubmit = (e) =>{
        e.preventDefault();
        // removeErrorMsgs() --> not sure why they did this but this was used here
        handleLogin();
    }
    const handleLogin = () =>{
        setLoading(true)
        const checkUserNames = (username) => {
            let result = false; 
            allUsersData.forEach((el) => {
                if(el.username === username){
                    result = true;
                }
            })
            return result; 
        }
        let inputData = {
            username: loginData.username,
            password: loginData.password,
        };
        let foundUserName = checkUserNames(inputData.username)
        if(inputData.username.length === 0 || inputData.password.length ===0){
            setLoading(false)
            // loginError uses here;  not sure why 
        }
        // fetch request here
            // POST inputData
    }
    const handleChange = (e) =>{
        setLoginData((prevLoginData) =>{
            return{
                ...prevLoginData, 
                [e.target.name]: e.target.value,
            }
        })
    }
    // const removeErrorMsgs = () =>{
    //     const errorMsg =
    //     typeof document !== "undefined" && document.querySelectorAll(".errorMsg");
    //     errorMsg.forEach((elem) => elem.classNameList.remove("show"));
    // }
    // handleHash was here but was commented out; 
    return (
        <div className={style.modalContainer}>
        {/* <button onClick={handleHash}>CLICK TO HASH</button> */}
  
        <div className={style.loginContainer}>
          <h1 className={style.loginTitle}>Hacking Transition</h1>
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Fields can not be blank!
          </span>
  
          <form className={style.loginForm} onSubmit={handleSubmit}>
            <input
              id="formInput"  
              className={`${style.loginInputBox} ${style.username}`}
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
            <span id="usernameLoginErrMsg" className={style.errorMsg}>
              Username Not Found!
            </span>
  
            <input
              id="formInput" 
              className={style.loginInputBox}
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <span id="passwordLoginErrMsg" className={style.errorMsg}>
              Incorrect Password!
            </span>
  
            <button type="submit" className={style.loginBtn}>
              LOG IN <CgEnter />{" "}
            </button>
  
            {/* <button
                          type='button'
                          className={`${style.loginBtn} ${style.createAccBtn}`}
                          onClick={handleShowCreateAccModal}>Create an Account</button> */}
          </form>
        </div>
      </div>
    );
}


export default Login