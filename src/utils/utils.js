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