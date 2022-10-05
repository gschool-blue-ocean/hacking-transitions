import React, { useState, useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../styles/LoginStyles.module.css";
import { server } from "../utility";
import { setAllUserData, setAllCohortData, setCurrentUser, setIsAdmin, setLoginState, } from "../redux/features/app-slice.js"
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import axios from "axios";


// i need to revise this so much
let Login = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { allUsersData } = useSelector(
      ({ app: { allUsersData } }) => ({
        allUsersData,
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
            setUserData(JSON.parse(currentUser)) // does current user need to be parsed? 
            
        }
    }, [])

    
    const handleLogin = (e) => {
      e.preventDefault();
      let inputData = {
        username: loginData.username,
        password: loginData.password
      }
    fetch(`${server}/api/users/userbyname/${inputData.username}`, {
        method: 'POST', 
        headers: {"Content-Type" : "application/json"}, 
        body: JSON.stringify(inputData.username)
      })
      .then(res => res.json()
      .then((data) => {  
    
        if (data.username === inputData.username && data.password === inputData.password) {
          dispatch(setLoginState(true));
          dispatch(setCurrentUser(data));
          dispatch(setIsAdmin(data.admin));
        } 
        
        if(data.admin === true){
          router.push('/admin/')
        } else{
          router.push('/student')
        }
       })
  
   
    )}
  
    const handleChange = (e) =>{
        setLoginData((prevLoginData) =>{
            return{
                ...prevLoginData, 
                [e.target.name]: e.target.value,
            }
        })
    }
    
    // handleHash was here but was commented out; 
    return (
        <div className={style.modalContainer}>
        {/* <button onClick={handleHash}>CLICK TO HASH</button> */}
  
        <div className={style.loginContainer}>
          <h1 className={style.loginTitle}>Hacking Transition</h1>
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Fields can not be blank!
          </span>
  
          <form className={style.loginForm} onSubmit={handleLogin}>
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