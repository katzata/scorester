import { useState } from "react";
import styles from "./SettingFields.module.scss";

import { register, login, changeSetting } from "../../../../services/userService";

export default function SettingFields({type, id, section, title}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    
    const loggedStyles = {
        color: "rgba(255, 255, 255, .5)",
        disabled: true
    };

    const fields = {
        login: ({title}) => {
            const formType = (toggle) => toggle ? "REGISTER" : "LOGIN";
            const toggleFormType = (e) => {
                e.preventDefault();
                setIsRegistering(!isRegistering);
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const username = formData.get("username");
                const password = formData.get("password");
                const rePassword = formData.get("rePassword");

                return isRegistering ? register(username, password, rePassword) : login(username, password);
            };

            const inputStyle = { width: isRegistering ? "94%" : "48%" };

            return <>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <p>{title}</p>
                    
                    <input type="text" name="username" placeholder="Username" style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" name="password" placeholder="Password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {isRegistering && <input type="password" name="rePassword" placeholder="Repeat password" style={inputStyle} value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>}
                    
                    <button>{formType(isRegistering)}</button>
                </form>

                <p>
                    <span>Or if you {isRegistering ? "already" : "don't"} have an account you can</span>
                    <button onClick={toggleFormType}>{formType(!isRegistering).toLocaleLowerCase()}</button>
                </p>
            </>
        },
        checkbox: ({id, section, title}) => (
            <>
                <p style={loggedStyles}>{title}</p>
                <input type="checkbox" id={id} data-section={section} style={loggedStyles} onChange={changeSetting} disabled={!isLogged}/>
            </>
        ),
        button: ({id, title}) => (
            <button id={id} onClick={changeSetting}>{title}</button>
        )
    };

    return <div className={styles.setting}>
        {fields[type]({id, section, title})}
    </div>
};