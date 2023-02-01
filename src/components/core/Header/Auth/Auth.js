import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import styles from "./Auth.module.scss";
import UserContext from "../../../../contexts/UserContext";
import ErrorsContext from "../../../../contexts/ErrorsContext";

import useFetch from "../../../../hooks/useFetch";
import { getStorage } from "../../../../utils/localStorage";
import Icons from "../../../shared/Icons/Icons";

function Auth({ title, handleLoggedState }) {
    const userContext = useContext(UserContext);
    const errorsContext = useContext(ErrorsContext);
    const { isLogged } = userContext.userData;
    const { id } = getStorage("scUserDetails") || {};
    const fetchBody = useMemo(() => ({ id }), [id]);

    const [isLoggedCheck, loggedCheckError, loading, fetchData] = useFetch("/checkIfLogged", fetchBody);
    const [username, setUsername] = useState("asd");
    const [password, setPassword] = useState("asdasd");
    const [rePassword, setRePassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    
    const formType = (toggle) => {

        return toggle ? "REGISTER" : "LOGIN";
    };

    /**
     * Toggle the form type from login to register and back to login.
     * @param {Event} e An event object.
     */
    const toggleFormType = (e) => {
        e.preventDefault();
        setIsRegistering(!isRegistering);
    };

    /**
     * Register a new user.
     */
    const register = ({username, password, rePassword}) => {
        const usernameCheck = checkInput({ type: "username", value: username });
        const passwordCheck = checkInput({ type: "password", value: password });
        const rePasswordCheck = checkInput({ type: "rePassword", value: rePassword });
    
        if (usernameCheck && passwordCheck && rePasswordCheck && password === rePassword) {
            const body = new URLSearchParams({
                username: username,
                password: password,
                rePassword: rePassword
            });

            fetchData("/register", body).then(res => {
                handleResponse("register", res);
            });
        } else {
            // !!!ERROR!!!
            console.warn(usernameCheck, passwordCheck, rePasswordCheck);
        };
    };

    /**
     * Log the user in.
     */
    const login = ({ username, password }) => {
        const body = new URLSearchParams({});
        body.append("username", username);
        body.append("password", password);

        fetchData("/login", body).then(res => {
            handleResponse("login", res);
        });
    };

    /**
     * Log the user out.
     */
    const logout = () => {
        fetchData("/logout").then(res => {
            if (res && res.status) {
                const { username, userSettings, gameSettings } = userContext.userData;
                userContext.setData({ username, userSettings, gameSettings }, true);
            } else {
                errorsContext.setErrors({ tag: "logout", subTag: "connection", text: res });
            };
        });
    };

    /**
     * Handle the form submition.
     * @param {Event} e An event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const actions = { register, login };
        const currentAction = isRegistering ? "register" : "login";

        actions[currentAction]({ username, password, rePassword, handleLoggedState: handleLoggedState });
    };

    /**
     * Handle the incoming https response (if available).
     * @param {Object} data The response object (initially json);
     */
    const handleResponse = (type, data) => {
        if (data && data.id) {
            data.isLogged = true;
            userContext.setData(data);
        } else {
            console.log(data);
            // undefined on login without server connection!
            const errors = data.Errors.slice(0).map(err => ({ tag: type, text: err }));
            errorsContext.setErrors("errors", errors);
        };
    };

    /**
     * Checks the validity of the user input.
     * @param {Object} obj An object containing the type and the value of the input that will be checked.
     * @param {String} obj.type A string containing the type of input (username, password, rePassword).
     * @param {Value} obj.type A string containing the user input (username, password, rePassword).
     * @returns {Boolean} True if the input passes the RegEx check or false, and triggers an error message.
     */
    const checkInput = ({ type, value }) => {
        if (type === "username") {
            const pattern = /[a-zA-Zа-яА-Я0-9.'\s]+/;
            const length = 3;

            return check(type, length, pattern);
        };

        if (type === "password" || type === "rePassword") {
            const pattern = /[a-zA-Zа-яА-Я0-9]+/;
            const length = 6;

            return check(type, length, pattern);
        };

        function check(type, length, pattern) {
            if (value.length >= length) {
                if (value.match(pattern)) {
                    return true;
                } else {
                    // !!!ERROR!!!
                    console.warn(`${type} contians invalid chars`);
                    return false;
                };
            } else {
                // !!!ERROR!!!
                console.warn(`${type} too short`);
                return false;
            };
        };
    };

    /**
     * Set the error data in the errors context.
     * @param {Error} data An error object.
     */
    const setErrorData = useCallback((errorData) => {
        const { message } = errorData;
        let error = { tag: "logCheck", text: "" }

        if (message === "Failed to fetch") {
            error.text = "No connection to the server!";
        };

        errorsContext.setErrors("warnings", [error]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Set the user context data.
     */
    const setUserData = useCallback(() => {
        userContext.setData(isLoggedCheck);
    }, [userContext, isLoggedCheck]);
    
    useEffect(() => {
        if (isLoggedCheck && !loggedCheckError && !isLogged) {
            if (isLoggedCheck.Errors === undefined) {
                setUserData(isLoggedCheck);
            };
        };

        if (loggedCheckError && !isLoggedCheck) {
            setErrorData(loggedCheckError);
        };
    }, [isLogged, isLoggedCheck, loggedCheckError,  setUserData, setErrorData]);

    const inputStyle = { width: isRegistering ? "94%" : "48%" };

    return <>
        {!isLogged && <>
            <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, handleLoggedState)}>
                <p>{title}</p>
                
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    style={inputStyle}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                {isRegistering && <input
                    type="password"
                    name="rePassword"
                    placeholder="Repeat password"
                    style={inputStyle}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    disabled={loading}
                />}
                
                <button disabled={loading}>{formType(isRegistering)}</button>
            </form>

            <p>
                <span>Or if you {isRegistering ? "already" : "don't"} have an account you can</span>
                <button onClick={toggleFormType} disabled={loading}>{formType(!isRegistering).toLocaleLowerCase()}</button>
            </p>
        </>}

        {isLogged && <div className={styles.loggedUserSection}>
            <div className={styles.userAvatarContainer}>
                <Icons current={"user"}/>
            </div>

            <button id="logout" onClick={() => logout(handleLoggedState)}>LOGOUT</button>
        </div>}
    </>
};

export default Auth;