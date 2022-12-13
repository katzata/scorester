import { useState } from "react";
import styles from "./Auth.module.scss";

import { register, login/* , logout, changeSetting  */} from "../../../../../services/userService";
// import { getStogare } from "../../../../../services/storageService";

function Auth({ title, callback }) {
    const [username, setUsername] = useState("asd");
    const [password, setPassword] = useState("asdasd");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    
    const formType = (toggle) => toggle ? "REGISTER" : "LOGIN";

    const toggleFormType = (e) => {
        e.preventDefault();
        setIsRegistering(!isRegistering);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const actions = { register, login };
        const currentAction = isRegistering ? "register" : "login";
        // console.log(username, password, callback);
        // const data = { username, password, callback: callback };
        
        // if (currentAction !== "login") {
        //     data["rePassword"] = rePassword;
        // };

        actions[currentAction]({ username, password, rePassword, callback: callback });

        // actions[currentAction](data);
    };

    const inputStyle = { width: isRegistering ? "94%" : "48%" };
    
    return <>
        <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, callback)}>
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
};

export default Auth;