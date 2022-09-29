import React, { useState, useEffect } from "react";
import 'react-bootstrap'



let Login = () => {
    const allUsersData = ""
    const [loading, setLoading] = useState(Boolean)
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
    const removeErrorMsgs = () =>{
        const errorMsg =
        typeof document !== "undefined" && document.querySelectorAll(".errorMsg");
        errorMsg.forEach((elem) => elem.classList.remove("show"));
    }
    // handleHash was here but was commented out; 
    return(
        <div>
           hello
        </div>
    )
}


export default Login