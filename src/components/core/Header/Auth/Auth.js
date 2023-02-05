import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import styles from "./Auth.module.scss";
import UserContext from "../../../../contexts/UserContext";
import ErrorsContext from "../../../../contexts/ErrorsContext";

import useFetch from "../../../../hooks/useFetch";
import { getStorage } from "../../../../utils/localStorage";
import Icons from "../../../shared/Icons/Icons";

function Auth({ title, handleLoggedState }) {
    const errorsContext = useContext(ErrorsContext);
    const userContext = useContext(UserContext);
    const { isLogged } = userContext.userData;
    const { id } = getStorage("scUserDetails") || {};
    const fetchBody = useMemo(() => ({ id }), [id]);

    const [isLoggedCheck, fetchError, loading, fetchData] = useFetch("/checkIfLogged", fetchBody);
    const [username, setUsername] = useState("asd");
    const [password, setPassword] = useState("asdas");
    const [rePassword, setRePassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(true);
    
    const formType = (toggle) => toggle ? "REGISTER" : "LOGIN";

    /**
     * Toggle the form type from login to register and back to login.
     * @param {Event} e An event object.
     */
    const toggleFormType = (e) => {
        e.preventDefault();
        errorsContext.dispatch({ type: "clear", payload: "errors"});
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
            const body = new URLSearchParams({ username, password, rePassword });
            fetchData("/register", body).then(res => handleResponse("register", res || fetchError));
        } else {
            const errors = [];

            if (usernameCheck instanceof Array) usernameCheck.forEach(err => errors.push(err));
            if (passwordCheck instanceof Array) passwordCheck.forEach(err => errors.push(err));
            if (rePasswordCheck instanceof Array) rePasswordCheck.forEach(err => errors.push(err));
            if (password !== rePassword) errors.push({ tag: "password", text: "Passwords do not match!" });

            errorsContext.dispatch({ type: "clear", payload: "errors"});
            setErrorData("add_errors", errors);
        };
    };

    /**
     * Log the user in.
     */
    const login = ({ username, password }) => {
        const body = new URLSearchParams({ username, password });

        fetchData("/login", body).then(res => {
            const action = res && fetchError ? "add_errors" : "";
            const data = res || fetchError;
            handleResponse(action, data);
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
                setErrorData("add_warning", [{ tag: "logout", subTag: "connection", text: res }]);
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
    const handleResponse = (action, data) => {
        if (data && data.id) {
            data.isLogged = true;
            userContext.setData(data);
        } else {
            if (data.Errors) {
                setErrorData(action, data.Errors);
            };
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
            const pattern = /[a-zA-Zа-яА-Я0-9.'\s]+$/;
            const length = 3;

            return check(type, length, pattern);
        };

        if (type === "password") {
            const pattern = /[a-zA-Zа-яА-Я0-9.!?]+$/;
            const length = 6;

            return check(type, length, pattern);
        };

        if (type === "rePassword") {
            const pattern = /[a-zA-Zа-яА-Я0-9.!?]+$/;
            const length = 0;

            return check(type, length, pattern);
        };

        function check(type, length, pattern) {
            const errors = [];

            if (!value.match(pattern)) {
                const field = type !== "rePassword" ? type : "repeat password";
                errors.push({ tag: type, text: `The ${field} contians invalid characters.` });
            };

            if (value === "" && type !== "rePassword") {
                return [{ tag: type, text: `The ${type} field can not be empty.` }]
            };

            if (value.length < length && type !== "rePassword") {
                errors.push({ tag: type, text: `The ${type} is too short` });
            };

            return errors.length > 0 ? errors : true;
        };
    };

    /**
     * Set the error data in the errors context.
     */
    const setErrorData = useCallback(
        /**
         * @param {String} action The action of messages that are being sent.
         * @param {Array.<object>} errorData An array of error objects.
         */
        (action, errorData) => {
            const errors = [];

            for (const error of errorData) {
                if (typeof error === "string") {
                    errors.push({ tag: formType(isRegistering), subTag: "api", text: error });
                } else {
                    const formatedError = { ...error };
    
                    if (error.message && (error.message.includes("Failed to fetch") || error.message.includes("Load failed"))) {
                        formatedError.tag = "connection";
                        formatedError.text = "No connection to the server!";
                    };
    
                    errors.push(formatedError);
                };
            };

            errorsContext.dispatch({ type: action, payload: errors});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Set the user context data.
     */
    const setUserData = useCallback(() => {
        userContext.setData(isLoggedCheck);
    }, [userContext, isLoggedCheck]);
    
    useEffect(() => {
        if (isLoggedCheck && !fetchError && !isLogged) {
            if (isLoggedCheck.Errors === undefined) {
                setUserData(isLoggedCheck);
            } else {
                if (isLoggedCheck.Errors[0] !== "no id") {
                    setErrorData("add_errors", isLoggedCheck.Errors);
                };
            };
        };

        if (fetchError && !isLoggedCheck && !isLogged) {
            setErrorData("add_warnings", [fetchError]);
        };
    }, [isLogged, isLoggedCheck, fetchError,  setUserData, setErrorData]);

    const inputStyle = { width: isRegistering ? "94%" : "48%" };

    return <>
        {!isLogged && <>
            <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, handleLoggedState)}>
                <p>{title}</p>
                
                <fieldset disabled={loading}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        style={inputStyle}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        style={inputStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegistering && <input
                        type="password"
                        name="rePassword"
                        placeholder="Repeat password"
                        style={inputStyle}
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />}
                
                    <button>{formType(isRegistering)}</button>
                </fieldset>
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