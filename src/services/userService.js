import { getStorage } from "./storageService";
// import { doFetch } from "../utils/utils";

/**
 * Handles the user registration.
 * Validates the user input and shows and error if it's not properly formated.
 * Checks if the username exists in the database and if not, it creates a new database entry.
 * Sets the localStorage user data.
 * @param {Object} obj An object containing the user input and a callback function.
 * @param {String} obj.username The user's username.
 * @param {String} obj.password The user's password.
 * @param {String} obj.rePassword The user's rePassword.
 * @param {Function} obj.handleLoggedState The handleLoggedState function handling the isLogged state.
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
        
        // doFetch({ route: "/register", body }).then(res => {
        //     // setStorage({ key: "scUserDetails", value: res });
            
        //     handleLoggedState();
        // });
    } else {
        // !!!ERROR!!!
        console.warn(usernameCheck, passwordCheck, rePasswordCheck);
    };
};

/**
 * Handles the user login.
 * Validates the user input and shows and error if it's not properly formated.
 * Checks if the username exists in the database and compares the input password and stored password.
 * @param {Object} obj An object containing the user input and a callback function.
 * @param {String} obj.username The user's username.
 * @param {String} obj.password The user's password.
 * @param {Function} obj.callback The callback function handling the isLogged state.
 */
export const login = async ({ username, password, handleLoggedState }) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

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

/**
 * Handles the user logout.
 * Clears the id key from the userDetails object stored in localStorage.
 * @param {Function} callback The callback function handling the isLogged state.
 */
export const logout = async (handleLoggedState) => {
    // doFetch({ route: "/logout" }).then(res => {
    //     if (res) {
    //         clearStorage();
    //         handleLoggedState(false);
    //     };
    // });
};

/**
 * Checks if the user is currently logged in.
 * Sends a request to the server containing the current user id (taken from localStorage).
 * @returns A boolean based on the fetched results.
 */
export const checkIfLogged = async () => {
    const userData = getStorage("scUserDetails") || {};

    if (userData.id) {
        const body = new URLSearchParams();
        body.append("id", userData.id);

        // return doFetch({ route: "/checkIfLogged", body }).then(res => {
        //     if (res && res.id && res.username && res.userSettings && res.gameSettings) {
        //         // setStorage({ key: "scUserDetails", value: res });
        //         return res;
		// 	} else {
        //         return false;
		// 	};
        // });
    } else {
        return false;
    };
};

/**
 * Initialise the scUserDetails local storage object.
 * If user data is already present it's value types get compared with the expected value types.
 * If the present data value types conform to the expected template are left intact.
 * @param {Object} presentData Either an object or an array of objects that contain a single key value pair (named key and value).
 * @returns Either the default or the checked user data object.
 */
export const initUserDetails = (presentData) => {
    const defaultData = {
        username: "",
        userSettings: { "keepRecord": false },
        gameSettings: {
            "numberOfPlayers": 1,
            "mainTimer": false,
            "individualTimers": false,
            "turnDuration": 0,
            "autoSwitchTurns": false,
            "negativeValues": false,
            "scoreBelowZero": false,
            "scoreTarget": 0,
            "editableFields": false
        }
    };
    // console.log(compareObjectData(presentData, defaultData), presentData);
    return compareObjectData(presentData, defaultData) ? presentData : defaultData;
};

/**
 * Compares the data type of two objects.
 * !!! Supports nesting at a depth of one level (further depth not be needed).
 * E.G. { a: [1,2...] }.
 * @param {Object.<any>} presentData An object containing any type of key value pairs.
 * @param {Object.<any>} defaultData An object containing any type of key value pairs.
 * @returns {Boolean} Indicates wether the data is ok or not.
 */
const compareObjectData = (presentData, defaultData) => {
    let dataOk = true;
    const presentKeys = presentData ? Object.keys(presentData) : {};
    const notOk = () => dataOk = false;
    
    defaultData = Object.entries(defaultData);

    if (presentKeys.length === defaultData.length || (presentKeys.length === defaultData.length + 1 && presentKeys.includes("id"))) {
        for (const [key, value] of defaultData) {
            if ((presentData[key] === undefined && key !== "id") || typeof presentData[key] !== typeof value) {
                notOk();
                break;
            };
            
            for (const [subKey, subValue] of Object.entries(value)) {
                if (typeof presentData[key][subKey] !== typeof subValue) {
                    console.log("xx", presentData[key][subKey], subValue);
                    notOk();
                    break;
                };
            };
        };
    } else {
        notOk();
    };

    return dataOk;
};

/**
 * Checks the validity of the user input.
 * @param {Object} obj An object containing the type and the value of the input that will be checked.
 * @param {String} obj.type A string containing the type of input (username, password, rePassword).
 * @param {Value} obj.type A string containing the user input (username, password, rePassword).
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