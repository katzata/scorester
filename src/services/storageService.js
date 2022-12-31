import { convertJson } from "../utils/utils";

/**
 * Initialise the scUserDetails local storage object.
 * If user data is already present it's value types get compared with the expected value types.
 * If the present data value types conform to the expected template are left intact.
 * @param {Object} presentData Either an object or an array of objects that contain a single key value pair (named key and value).
 * @returns Either the default or the checked user data object.
 */
export const initUserDetails = () => {
    const presentData = getStorage("scUserDetails");
    const userDetails = handleUserDetails(presentData);

    if (presentData !== userDetails) {
        console.log(presentData, userDetails);
        setStorage({ key: "scUserDetails", value: userDetails });
        return userDetails;
    } else {
        return presentData;
    };
};

/**
 * Sets key value pair/s in local storage.
 * @param {Object || Array} storageData Either an object or an array of objects that contain a single key value pair (named key and value).
 */
export const setStorage = (storageData) => {
    if (storageData instanceof Array) {
        for (const data of storageData) {
            localStorage.setItem(data.key, convertJson(data.value));
        };
    } else {
        localStorage.setItem(storageData.key, convertJson(storageData.value));
    };
};

/**
 * Gets a local storage entry.
 * @param {Object || Array} storageKeys Either a string or an array of strings that represent localstorage keys.
 * @returns the value associated with the sepcific key (if it exists).
 */
export const getStorage = (storageKeys) => {
    if (storageKeys instanceof Array) {
        const data = [];

        for (const key of storageKeys) {
            data.push(convertJson(localStorage.getItem(key)));
        };
        
        return data;
    } else {
        return convertJson(localStorage.getItem(storageKeys));
    };
};

/**
 * Removes the id key from the localStorage userDetails.
 */
export const clearStorage = () => {
    const { username, userSettings, gameSettings } = JSON.parse(localStorage.getItem("scUserDetails") || "{}");

    localStorage.setItem(
        "scUserDetails",
        JSON.stringify({ username, userSettings, gameSettings })
    );
};

/**
 * A function that takes in a the present user data, then makes a validity check in order to return the proper values.
 * @param {Object} presentData The currently present user details object from local storage.
 * @returns Either the present data object if it passes the validity check, or the default user data object.
 */
const handleUserDetails = (presentData) => {
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

    return presentData && compareStorageData(presentData, defaultData) ? presentData : defaultData;
};

/**
 * Compares the present user details obejct found in localStorage against the default user object.
 * Compares the key names and their respective value types.
 * @param {Object} presentData The present user details.
 * @param {Object} defaultData The default user details object.
 * @returns A boolean reoresenting the validitty of the present data object.
 */
const compareStorageData = (presentData, defaultData) => {
    let localStorageOk = true;
    const localKeys = presentData ? Object.keys(presentData) : {};
    const notOk = () => localStorageOk = false;
    
    defaultData = Object.entries(defaultData);

    if (localKeys.length === defaultData.length || (localKeys.length === defaultData.length + 1 && localKeys.includes("id"))) {
        for (const [key, value] of defaultData) {
            if ((!presentData[key] && key !== "username") || typeof presentData[key] !== typeof value) {
                notOk();
                break;
            };
            
            for (const [subKey, subValue] of Object.entries(value)) {
                if (typeof presentData[key][subKey] !== typeof subValue) {
                    notOk();
                    break;
                };
            };
        };
    } else {
        notOk();
    };

    return localStorageOk;
};