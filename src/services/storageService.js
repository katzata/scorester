import { convertJson } from "../utils/utils";

/**
 * Initialise the local storage object.
 * @param { Object } presentData Either an object or an array of objects that contain a single key value pair (named key and value).
 */
export const initStorage = (presentData) => {
    const defaultData = {
        username: "",
        userSettings: { "keepRecord": false },
        gameSettings: {
            "numberOfPlayers": 1,
            "scoreBelowZero": false,
            "scoreTarget": 0,
            "mainTimer": false,
            "turnDuration": 0,
            "individualTimers": false
        }
    };
    const presentDataOk = presentData ? compareStorageData(presentData, defaultData) : false;
    
    if (!presentDataOk) {
        setStorage({ scUserDetails: defaultData });
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
export const getStogare = (storageKeys) => {
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

const compareStorageData = (presentData, defaultData) => {
    const localKeys = Object.keys(presentData);
    defaultData = Object.entries(defaultData);
    let localStorageOk = true;

    if (localKeys.length === defaultData.length || (localKeys.length === defaultData.length + 1 && localKeys.includes("id"))) {
        for (const [key, value] of defaultData) {
            if (!presentData[key] || typeof presentData[key] !== typeof value) {
                localStorageOk = false;
                break;
            };

            for (const [subKey, subValue] of Object.entries(value)) {
                if (typeof presentData[key][subKey] !== typeof subValue) {
                    localStorageOk = false;
                    break;
                };
            };
        };
    } else {
        localStorageOk = false;
    };

    return localStorageOk;
};