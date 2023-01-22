import { useEffect, useState, useContext } from "react";
import styles from "./UserSettings.module.scss";

import { logout } from "../../../../services/userService";
import { getStorage, saveToStorage } from "../../../../services/storageService";
import { changeSettingInDB } from "../../../../services/gameService";
import UserContext from "../../../../contexts/UserContext";

import useFetch from "../../../../hooks/useFetch";

import Icons from "../../../shared/Icons/Icons";
import Auth from "../SettingFields/Auth/Auth";
import Checkbox from "../SettingFields/Checkbox/Checkbox";
import LoadingText from "../../../shared/LoadingText/LoadingText";

/**
 * 
 * @param {Object} props
 * @param {Boolean} props.handleLoggedState
 * 
 * @component
 * @param {Boolean} props.handleLoggedState
 */
export default function UserSettings({ _, handleLoggedState }) {
    const userContext = useContext(UserContext);
    const { isLogged } = userContext;

    const [settings, error, loading] = useFetch("settings/user.json", null, true);
    const [currentFieldValues, setCurrentFieldValues] = useState({});
    const [currentlyFetching, setCurrentlyFetching] = useState([]);

    /**
     * Changes a specific setting value updating the component state and the local storage object.
     * Tryes to connect to the api to save the new changes if the user is logged in.
     * @async
     * @function changeValues
     * @param {EventTarget} setting The event target or an object with specific keys value pairs (type, id, checked, value).
     * @param {String} setting.type The type of input.
     * @param {String} setting.id The id of the input.
     * @param {Boolean} setting.checked Will be present if the input is a checkbox.
     * @param {String|Number} setting.value Will be present if the input is a text or number field.
     */
    const changeValues = async (setting) => {
        const { type, id, checked, value } = setting;
        const localData = getStorage("scUserDetails") || {};
        const newValues = {...localData.userSettings};
        const settingValue = type === "checkbox" ? checked : value;

        newValues[id] = type === "number" ? Number(settingValue) : settingValue;
        localData.userSettings = newValues;

        if (isLogged && !currentlyFetching.includes(id)) {
            setCurrentlyFetching([id, ...currentlyFetching]);
            await changeSettingInDB(setting).then(() => setCurrentlyFetching([...currentlyFetching].splice(id, 1)));
        };

        saveToStorage("scUserDetails", { userSettings: newValues } );
        setCurrentFieldValues(newValues);
    };

    /**
     * Merge the currently available settings with the present settings object if available.
     * @param {Array<object>} settings The currently available settings and their respective values.
     * @returns An array containing the merged settings.
     */
    function mergeValues(settings) {
        const storageData = getStorage("scUserDetails");
        const currentValues = {};

        if (storageData && storageData.userSettings) {
            const userSettings = storageData.userSettings;

            for (let i = 0; i < settings.length; i++) {
                const { id, defaultValue } = settings[i];
                const isNotDefault = typeof userSettings[id] === typeof defaultValue && userSettings[id] !== defaultValue;
                
                Object.defineProperty(currentValues, id, {
                    value: isNotDefault ? userSettings[id] : defaultValue
                });
            };
        };

        return currentValues;
    };
    
    useEffect(() => {
        if (settings) {
            setCurrentFieldValues(mergeValues(settings));
        };
    }, [isLogged, settings]);

    return <div className={styles.userSettings}>
        <h3 onClick={() => {userContext.login()}}>User settings</h3>

        <div className={styles.settingsSection}>
            {settings && settings.map((el, idx) =>  {
                const { type, title, id, disabled } = el;
                const section = "user_settings";

                const availableFields = {
                    login: <Auth type={type} handleLoggedState={handleLoggedState} key={`user${idx}`} />,
                    checkbox: <Checkbox title={title} id={id} section={section} value={currentFieldValues[id]} changeHandler={changeValues} disabled={disabled} key={`user${idx}`} />
                };

                if (isLogged && type === "login") {
                    return <div className={styles.loggedUserSection} key={`user${idx}`}>
                        <div className={styles.userAvatarContainer}>
                            <Icons current={"user"}/>
                        </div>

                        <button id="logout" onClick={() => logout(handleLoggedState)} key={`user${idx}`}>LOGOUT</button>
                    </div>;
                };

                return availableFields[type];
            })}

            {loading && <LoadingText text="Retrieving"/>}

            {error && <>
                <h1>json fetch error :</h1>
                <span>error</span>
            </>}
        </div>
    </div>;
};