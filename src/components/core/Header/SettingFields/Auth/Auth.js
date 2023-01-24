import {/*  useEffect,  */useState, useContext } from "react";
import styles from "./Auth.module.scss";
import UserContext from "../../../../../contexts/UserContext";

import { register/* , logout, changeSetting  */} from "../../../../../services/userService";
import useFetch from "../../../../../hooks/useFetch";
// import { getStogare } from "../../../../../services/storageService";

function Auth({ title, handleLoggedState }) {
    const userContext = useContext(UserContext);
    // const { isLogged } = userContext;
    // console.log(userContext);

    const [data, error, loading, fetchData] = useFetch("");
    const [username, setUsername] = useState("asd");
    const [password, setPassword] = useState("asdasd");
    const [rePassword, setRePassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    
    const formType = (toggle) => toggle ? "REGISTER" : "LOGIN";

    const toggleFormType = (e) => {
        e.preventDefault();
        setIsRegistering(!isRegistering);
    };

    const login = async ({ username, password }) => {
        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);

        fetchData("/").then(res => userContext.login(res));
        // return doFetch({ route: "/login", body }).then(res => {
        //     let loggedIn = false;
        //     let response = {};
    
        //     if (res.id) {
        //         loggedIn = true;
        //         response = res;
        //     } else {
        //         // !!!ERROR!!!
        //         console.warn(res.errors);
        //     };
    
        //     handleLoggedState(loggedIn, response );
        // });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const actions = { register, login };
        const currentAction = isRegistering ? "register" : "login";

        actions[currentAction]({ username, password, rePassword, handleLoggedState: handleLoggedState });
    };

    const inputStyle = { width: isRegistering ? "94%" : "48%" };

    // useEffect(() => {
    //     console.log(data);
    // }, [data])
    
    return <>
        <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, handleLoggedState)}>
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