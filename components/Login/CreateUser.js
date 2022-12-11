import { useState } from "react";
import { useRouter } from 'next/router';
import style from "../../styles/LoginStyles.module.css";

let CreateUser = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        first: "", 
        last: "", 
        email: "",
        username: "", 
        password: "",
    }); 
    const handleNewStudent = () => {

    }
    return (
        <div className={style.modalContainer}>
            <div className={style.loginContainer}>
                <h1 className={style.loginTitle}>Register</h1>
                <form className={style.loginForm} onSubmit={handleNewStudent}>
                    <span>
                        <label htmlFor="firstName" className={style.label}>
                            First Name
                        </label>
                        <input
                            required
                            name="firstName"
                            id="formInput"
                            type="text"
                            placeholder="First Name"
                            value={userData.first}
                        />
                    </span>
                    <span>
                        <label className={style.label}>
                            Last Name
                        </label>
                        <input
                            required
                            name="lastName"
                            id="formInput"
                            type="text"
                            placeholder="Last Name"
                            value={userData.last}
                            />
                    </span>
                    <span>
                        <label className={style.label}>
                            Email
                        </label>
                        <input
                            required
                            name="email"
                            id="formInput"
                            type="text"
                            placeholder="Email"
                            value={userData.email}
                            />
                    </span>

                </form>
            </div>
        </div>
    )
}