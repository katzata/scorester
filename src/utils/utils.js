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