import { doFetch, setRequestBody } from "../utils/utils";

/**
 * Change a game setting.
 * Tryes to connect to the database in order to store the option changes.
 * @param {Event} setting The triggered event target object (e.target/html element) from which to extract the necessary keys (type, id, dataset, checked, value).
 * !!!This is a shared function, and not all fields will be available at all times (checkbox, number or text input)!!!
 * @returns {Boolean} Either true if the setting has been changed or false if 
 */
export const changeSettingInDB = (setting) => {
    const { type, id, dataset, checked, value } = setting;

    const route = `/${dataset.section.replace("_s", "S")}`;
    const currentValue = type === "checkbox" ? checked : value;
    const body = setRequestBody(Object.fromEntries([[id, currentValue]]));

    return doFetch({route, body}).then(res => {
        let result = true;
        if (res.error) {
            // !!!ERROR!!!
            console.log("A backend problem has arisen. Proceeding with local storage only");
            result = false;
        };

        return result;
    });
};