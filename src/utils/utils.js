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
 * Compares the data type of two objects.
 * !!! Supports nesting at a depth of one level (further depth not be needed).
 * E.G. { a: [1,2...] }.
 * @param {Object.<any>} presentData An object containing any type of key value pairs.
 * @param {Object.<any>} defaultData An object containing any type of key value pairs.
 * @returns {Boolean} Indicates wether the data is ok or not.
 */
export const compareObjectData = (presentData, defaultData) => {
    let dataOk = true;
    const presentKeys = presentData ? Object.keys(presentData) : {};
    const notOk = () => dataOk = false;
    
    defaultData = Object.entries(defaultData);

    if (presentKeys.length === defaultData.length || (presentKeys.length === defaultData.length + 1 && presentKeys.includes("id"))) {
        for (const [key, value] of defaultData) {
            if ((presentData[key] === undefined && key !== "id") || typeof presentData[key] !== typeof value) {
                console.log("x", key);
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

    return dataOk;
};










/**
 * Do a fetch request.
 * @param {Object} obj An object containing the query options to execute the fetch.
 * @param {String} obj.route A string containing the path for url.
 * @param {URLSearchParams || null} obj.body (OPTIONAL) An object containing a user query which will be sent to the server.
 * @returns The properly formated server response (json), or false(boolean) in case of an error.
 */
export async function doFetch({ route, body }) {
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
            console.log(res);
            if (res.status >= 400 && res.status < 500) {
                return res.json();
            } else {
                return res.json();
            };
        })
        .catch(error => {
            // !!!ERROR!!!
            console.warn("not json!!!", error.message);
            return false
        })
        .then(res => res)
        .catch(error => {
            // !!!ERROR!!!
            console.warn(error)
            return false
        });
};