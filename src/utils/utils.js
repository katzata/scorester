/**
 * Converts from and to json (depending on what is passed).
 * @param {Any} item Accepts any type of Object and converts it to json.
 * Also accepts json and parses it.
 * @returns Either the parsed object or the stringifyed object.
 */
export function convertJson(item) {
    try {
        return JSON.parse(item);
    } catch (err) {
        return JSON.stringify(item);
    };
};

/**
 * Convert a basic object to a URLSearchParams object.
 * @param {Object} data An object containing the key value pairs that will be sent to the backend.
 * @returns URLSearchParams object.
 */
export function setRequestBody(data) {
    const body = new URLSearchParams();

    for (const key in data) {
        body.append(key, data[key]);
    };

    return body;
};

/**
 * Merges two objects (defaultData with newData).
 * @param {Object.<any>} defaultData An object containing any type of key value pairs.
 * @param {Object.<any>} newData An object containing any type of key value pairs.
 * @returns {Boolean} Indicates wether the data is ok or not.
 */
export const mergeObjectData = (newData, defaultData) => {
    const mergedData = {};

    if (newData) {
        for (const [key, value] of Object.entries(defaultData)) {
            const newValueCheck = newData[key] !== undefined && typeof newData[key] === typeof value;
            mergedData[key] = newValueCheck ? newData[key] : value;
        };
    };

    return newData ? mergedData : defaultData;
};

/**
 * Capitalize the first letter of a string.
 * @param {String} text A string.
 * @returns {String} The capitalized string.
 */
export const capitalize = (text) => text[0].toLocaleUpperCase() + text.slice(1);