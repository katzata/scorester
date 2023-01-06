import { convertJson } from "../utils/utils";

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
	 * Update the local storage data object (scUserDetails/scGameDetails).
	 * @param {String} key The key respresenting the necessary details object within the local storage.
	 * @param {Object} data The key value pairs represent the data that will be changed in the local storage object.
     * If the value is a nested value (will be an array) an index and value keys should be provided in order to change the proper element.
     * E.G. { dataKey: { index: 0, value: "x" }}
	 */
export const saveToStorage = (key, data) => {
    const localData = getStorage(key) || {};

    for (const [dataKey, state] of Object.entries(data)) {
        if (localData[dataKey] !== undefined) {
            if (state.index) {
                localData[dataKey][state.index] = state.value;
            } else {
                localData[dataKey] = state;
            };
        };
    };

    setStorage({ key: key, value: localData });
};

// /**
//  * Compares the present user details obejct found in localStorage against the default user object.
//  * Compares the key names and their respective value types.
//  * @param {Object} presentData The present user details.
//  * @param {Object} defaultData The default user details object.
//  * @returns A boolean reoresenting the validitty of the present data object.
//  */
// const compareStorageData = (presentData, defaultData) => {
//     let localStorageOk = true;
//     const localKeys = presentData ? Object.keys(presentData) : {};
//     const notOk = () => localStorageOk = false;
    
//     defaultData = Object.entries(defaultData);

//     if (localKeys.length === defaultData.length || (localKeys.length === defaultData.length + 1 && localKeys.includes("id"))) {
//         for (const [key, value] of defaultData) {
//             if ((!presentData[key] && key !== "username") || typeof presentData[key] !== typeof value) {
//                 notOk();
//                 break;
//             };
            
//             for (const [subKey, subValue] of Object.entries(value)) {
//                 if (typeof presentData[key][subKey] !== typeof subValue) {
//                     notOk();
//                     break;
//                 };
//             };
//         };
//     } else {
//         notOk();
//     };

//     return localStorageOk;
// };