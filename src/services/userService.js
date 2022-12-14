import { setStorage, getStogare, clearStorage, initStorage } from "./storageService";
import { setRequestBody } from "../utils/utils";

/**
 * A list of all the option queries that are being currently fetched.
 * For preventing multiple (simultaneous) queries for the same option.
 */
const fetching = [];

/**
 * Handles the user registration.
 * Validates the user input and shows and error if it's not properly formated.
 * Checks if the username exists in the database and if not, it creates a new database entry.
 * Sets the localStorage user data.
 * @param {Object} obj An object containing the user input and a callback function.
 * @property {String} obj.username The user's username.
 * @property {String} obj.password The user's password.
 * @property {String} obj.rePassword The user's rePassword.
 * @property {Function} obj.handleLoggedState The handleLoggedState function handling the isLogged state.
 */
export const register = async ({username, password, rePassword, handleLoggedState}) => {
    const usernameCheck = checkInput({ type: "username", value: username });
    const passwordCheck = checkInput({ type: "password", value: password });
    const rePasswordCheck = checkInput({ type: "rePassword", value: rePassword });

    if (usernameCheck && passwordCheck && rePasswordCheck && password === rePassword) {
        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);
        body.append("rePassword", rePassword);
        
        doFetch({ route: "/register", body }).then(res => {
            // setStorage({ key: "scUserDetails", value: res });
            handleLoggedState();
        });
    } else {
        // !!!ERROR!!!
        console.warn(usernameCheck, passwordCheck, rePasswordCheck);
    };
};

/**
 * Handles the user login.
 * Validates the user input and shows and error if it's not properly formated.
 * Checks if the username exists in the database and compares the input password and stored password.
 * Sets the localStorage user data.
 * @param {Object} obj An object containing the user input and a callback function.
 * @property {String} obj.username The user's username.
 * @property {String} obj.password The user's password.
 * @property {Function} obj.callback The callback function handling the isLogged state.
 */
export const login = async ({username, password, handleLoggedState}) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    return doFetch({ route: "/login", body }).then(res => {
        let loggedIn = false;

        if (res.id) {
            setStorage({ key: "scUserDetails", value: res });
            loggedIn = true;
        } else {
            // !!!ERROR!!!
            console.warn(res.errors);
        };

        handleLoggedState(loggedIn);
        return res;
    });
};

/**
 * Handles the user logout.
 * Clears the id key from the userDetails object stored in localStorage.
 * @param {Function} callback The callback function handling the isLogged state.
 */
export const logout = async (handleLoggedState) => {
    doFetch({ route: "/logout" }).then(res => {
        if (res) {
            clearStorage();
            handleLoggedState(false);
        };
    });
};

/**
 * Change a user or a game setting.
 * Tryes to connect to the database in order to store the option changes.
 * Updates the localStorade object to reflect the latest changes.
 * !!! In case the connection fails it carries on updating the localStorage object !!!
 * @param {Event} e The triggered event object from which to extract the necessary keys.
 */
export const changeSetting = (setting) => {
    const { type, id, dataset, checked, value } = setting;
    const localData = getStogare("scUserDetails");
    const isLogged = localData && localData.id;

    setOption({section: dataset.section, id, checked, value});

    function setOption({section, id, checked, value}) {
        const route = `/${section.replace("_s", "S")}`;
        const currentValue = type === "checkbox" ? checked : value;

        const saveLocaly = () => {
            localData[route.slice(1)][id] = currentValue;
            setStorage({ key: "scUserDetails", value: localData });
        };

        if (isLogged && !fetching.includes(id)) {
            const body = setRequestBody(Object.fromEntries([[id, currentValue]]));
            fetching.push(id);
            
            doFetch({route, body}).then(res => {
                if (res.error) {
                    // !!!ERROR!!!
                    console.log("A backend problem has arised. Proceeding with local storage only");
                };
                
                saveLocaly();
                fetching.splice(id);
            });
        } else {
            saveLocaly();
        };
    };
};

/**
 * Checks if the user is currently logged in.
 * Sends a request to the server containing the current user id (taken from localStorage).
 * @returns A boolean based on the fetched results.
 */
export const checkIfLogged = async () => {
    const userData = getStogare("scUserDetails") || {};
    // let storageOk = false;

    if (userData.id) {
        const body = new URLSearchParams();
        body.append("id", userData.id);

        return doFetch({ route: "/checkIfLogged", body }).then(res => {
            if (res && res.id && res.username && res.userSettings && res.gameSettings) {
				setStorage({ key: "scUserDetails", value: res });
                return true;
			} else {
                initStorage(userData);
                return false;
			};
        });
    } else {
        initStorage(userData);
        return false;
    };
};

/**
 * Do a fetch request.
 * @param {Object} obj An object containing the query options to execute the fetch.
 * @property {String} obj.route A string containing the path for url.
 * @property {URLSearchParams || null} obj.body An object containing a user query which will be sent to the server.
 * @returns The properly formated server response (json), or false(boolean) in case of a server error.
 */
async function doFetch({ route, body }) {
    const options = {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    };

    if (body) options["body"] = body;

    return fetch(`${process.env.REACT_APP_REST + route}`, options)
        .then(res => {
            if (res.status >= 400 && res.status < 500) {
                // console.log("status", res.status);
                return res.json();
            } else {
                return res.json();
            };
        })
        .catch(error => {
            // !!!ERROR!!!
            console.warn("not json", error)
            return false
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            // !!!ERROR!!!
            console.warn(error)
            return false
        });
};

/**
 * Checks the validity of the user input.
 * @param {Object} obj An object containing the type and the value of the input that will be checked.
 * @property {String} obj.type A string containing the type of input (username, password, rePassword).
 * @property {Value} obj.type A string containing the user input (username, password, rePassword).
 * @returns True if the input passes the RegEx check or false, and triggers an error message.
 */
function checkInput({ type, value }) {
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