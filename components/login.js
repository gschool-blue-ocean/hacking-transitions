import React, { useState, useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../styles/LoginStyles.module.css";
import { server } from "../utility";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice.js"
import { useSelector, useDispatch } from "react-redux";
import style from "../styles/LoginStyles.module.css"


let Login = () => {
    let listOfUserNames=[]; 
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
            setUserData(currentUser) // does current user need to be parsed? 
            // they used invokeSetLogin here but im not sure where it came from ; browser says its not defined
        }
    }, [])

    // useEffect(() => {
    //   (async () => {
    //     const allUsers = await (await fetch(${server}/api/users)).json();
    //     dispatch(setAllUserData(allUsers));

    //   })();
    //  allUsersData.forEach((user) =>{
    //     return listOfUserNames.push(user.username)

    //   })
    // }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        // removeErrorMsgs() --> not sure why they did this but this was used here
        handleLogin();
    }
    const handleLogin = () =>{
      let inputData = {
        username: loginData.username,
        password: loginData.password
      }
    fetch(`${server}/api/users/userbyname/${inputData.username}`, {
        method: 'POST', 
        headers: {"Content-Type" : "application/json"}, 
        body: JSON.stringify(inputData.username)
      })
      .then((res) => console.log(res))


    }
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
      {/* <button onClick={handleHash}>CLICK TO HASH</button> /}*/

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
                        className={${style.loginBtn} ${style.createAccBtn}}
                        onClick={handleShowCreateAccModal}>Create an Account</button> */}
        </form>
      </div>
    </div>
  );
}


export default Login