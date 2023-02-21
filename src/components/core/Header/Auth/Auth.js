import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import styles from "./Auth.module.scss";

import UserContext from "../../../../contexts/UserContext";
import GameContext from "../../../../contexts/GameContext";
import ErrorsContext from "../../../../contexts/ErrorsContext";

import useFetch from "../../../../hooks/useFetch";
import { getStorage } from "../../../../utils/localStorage";
import Icons from "../../../shared/Icons/Icons";

function Auth({ title, handleLoggedState }) {
    const errorsContext = useContext(ErrorsContext);
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { isLogged } = userContext.userData;
    const { id } = getStorage("scUserDetails") || {};
    const fetchBody = useMemo(() => ({ id }), [id]);

    const [isLoggedCheck, fetchError, loading, fetchData] = useFetch("/checkIfLogged", fetchBody);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    
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
        const usernameNotValid = checkInput({ inputType: "username", value: username });
        const passwordNotValid = checkInput({ inputType: "password", value: password });
        const rePasswordNotValid = checkInput({ inputType: "rePassword", value: rePassword });
    
        if (usernameNotValid || passwordNotValid || rePasswordNotValid || password !== rePassword) {
            const errors = [];

            if (usernameNotValid instanceof Array) usernameNotValid.forEach(err => errors.push(err));
            if (passwordNotValid instanceof Array) passwordNotValid.forEach(err => errors.push(err));
            if (rePasswordNotValid instanceof Array) rePasswordNotValid.forEach(err => errors.push(err));
            if (password !== rePassword) errors.push({ tag: "password", text: "Passwords do not match!" });

            errorsContext.dispatch({ type: "clear", payload: "errors"});
            setErrorData("add_errors", errors);
        } else {
            const body = new URLSearchParams({ username, password, rePassword });
            fetchData("/register", body).then(res => handleResponse("register", res || fetchError));
        };
    };

    /**
     * Log the user in.
     */
    const login = ({ username, password }) => {
        const inputTypes = ["username", "password"];
        const usernameNotValid = checkInput({ inputType: inputTypes[0], value: username }, true);
        const passwordNotValid = checkInput({ inputType: inputTypes[1], value: password }, true);

        if (usernameNotValid || passwordNotValid) {
            const errors = [usernameNotValid, passwordNotValid];
            for (let i = 0; i < errors.length; i++) {
                if (!errors[i][0]) continue;
                errors[i] = { tag: "login", subTag: inputTypes[i], text: errors[i][0].text };
            };

            setErrorData("add_errors", errors);
        } else {
            const body = new URLSearchParams({ username, password });

            fetchData("/login", body).then(res => {
                const action = res && fetchError ? "add_errors" : "";
                const data = res || fetchError;

                handleResponse(action, data);
            });
        }
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
     * Delete the user account.
     */
    const deleteAccount = () => {
        const check = window.confirm("Are you sure you want to delete your account?");

        if (check) {
            const body = new URLSearchParams({ id });

            fetchData("/delete", body).then(res => {
                if (res && res.status) {
                    const { username, userSettings, gameSettings } = userContext.userData;
                    userContext.setData({ username, userSettings, gameSettings }, true);
                } else {
                    setErrorData("add_errors", [{ tag: "delete", subTag: "connection", text: res }]);
                };
            });
        };
    };

    /**
     * Handle the form submission.
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
        const { id, gameSettings, Errors } = data;
        if (data && id) {
            data.isLogged = true;
            userContext.setData(data);

            gameSettings && gameContext.dispatch({ type: "number_of_players", payload: Number(gameSettings.numberOfPlayers) });
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
     * @param {Value} obj.value A string containing the user input (username, password, rePassword).
     * @param {Boolean} lengthOnly The type of check to be made ()
     * @returns {Boolean} True if the input passes the RegEx check or false, and triggers an error message.
     */
    const checkInput = ({ inputType, value }, isEmptyOnly) => {
        if (inputType === "username") {
            const pattern = /[a-zA-Zа-яА-Я0-9.'\s]+$/;
            const length = !isEmptyOnly ? 3 : 0;

            return check(inputType, length, pattern);
        };

        if (inputType === "password") {
            const pattern = /[a-zA-Zа-яА-Я0-9.!?]+$/;
            const length = !isEmptyOnly ? 6 : 0;
            return check(inputType, length, pattern);
        };

        if (inputType === "rePassword") {
            const pattern = /[a-zA-Zа-яА-Я0-9.!?]+$/;
            const length = 0;

            return check(inputType, length, pattern);
        };

        function check(inputType, length, pattern) {
            const errors = [];

            if (!value.match(pattern)) {
                const field = inputType !== "rePassword" ? inputType : "repeat password";
                errors.push({ tag: inputType, text: `The ${field} contains invalid characters.` });
            };

            if (value === "" && inputType !== "rePassword") {
                return [{ tag: inputType, text: `The ${inputType} field can not be empty.` }]
            };

            if (value.length < length && inputType !== "rePassword") {
                errors.push({ tag: inputType, text: `The ${inputType} is too short` });
            };

            return errors.length > 0 ? errors : false;
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
                    const formattedError = { ...error };
    
                    if (error.message && (error.message.includes("Failed to fetch") || error.message.includes("Load failed"))) {
                        formattedError.tag = "connection";
                        formattedError.text = "No connection to the server!";
                    };
    
                    errors.push(formattedError);
                };
            };

            errorsContext.dispatch({ type: action, payload: errors });
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

            <section className={styles.toggleFormSection}>
                <p>Or if you {isRegistering ? "already" : "don't"} have an account you can</p>
                <button id="formToggle" className={styles.toggleFormButton} onClick={toggleFormType} disabled={loading}>{formType(!isRegistering).toLocaleLowerCase()}</button>
            </section>
        </>}

        {isLogged && <div className={styles.loggedUserSection}>
            <div id="avatar" className={styles.userAvatarContainer}>
                <Icons current={"user"}/>

                <p>{userContext.userData.username}</p>
            </div>

            <div className={styles.loggedButtonsContainer}>
                <button id="deleteAccount" onClick={() => deleteAccount(handleLoggedState)}>Delete account</button>
                <button id="logout" onClick={() => logout(handleLoggedState)}>LOGOUT</button>
            </div>
        </div>}
    </>
};

export default Auth;