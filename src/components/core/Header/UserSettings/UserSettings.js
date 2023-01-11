import { useEffect, useState } from "react";
import styles from "./UserSettings.module.scss";
import { fetchData } from "../../../../services/fetchService";
import { logout } from "../../../../services/userService";
import { getStorage, saveToStorage } from "../../../../services/storageService";
import { changeSettingInDB } from "../../../../services/gameService";

import Icons from "../../../shared/Icons/Icons";
import Auth from "../SettingFields/Auth/Auth";
import Checkbox from "../SettingFields/Checkbox/Checkbox";

export default function UserSettings({ isLogged, handleLoggedState }) {
    const [availableSettings, setAvailableSettings] = useState(null);
    const [currentValues, setCurrentValues] = useState(null);
    const [currentlyFetching, setCurrentlyFetching] = useState([]);

    const handleValues = (settings, localData) => {
        const values = {};

        if (localData && localData.gameSettings) {
            const { userSettings } = localData;

            for (const { id, defaultValue } of settings) {
                values[id] = userSettings[id] ? userSettings[id] : defaultValue;
            };
        };

        return values;
    };

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
        const localData = getStorage("scUserDetails");
        const newValues = {...localData.gameSettings};
        const settingValue = type === "checkbox" ? checked : value;

        newValues[id] = type === "number" ? Number(settingValue) : settingValue;
        localData.gameSettings = newValues;

        if (isLogged && !currentlyFetching.includes(id)) {
            setCurrentlyFetching([id, ...currentlyFetching]);
            await changeSettingInDB(setting).then(() => setCurrentlyFetching([...currentlyFetching].splice(id, 1)));
        };
        
        saveToStorage("scUserDetails", { userSettings: newValues } );
        setCurrentValues(newValues);
    };
    
    useEffect(() => {
        fetchData("settings/user.json").then(res => {
            const localData = getStorage("scUserDetails");
            const values = handleValues(res, localData);

            setCurrentValues(values);
            setAvailableSettings(res);
        });
    }, [isLogged]);

    return <div className={styles.userSettings}>
        <h3>User settings</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.map((el, idx) =>  {
                const { type, title, id, disabled } = el;
                const section = "user_settings";
                const availableFields = {
                    login: <Auth type={type} handleLoggedState={handleLoggedState} key={`user${idx}`} />,
                    checkbox: <Checkbox title={title} id={id} section={section} value={currentValues[id]} changeHandler={changeValues} disabled={disabled} key={`user${idx}`} />
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
        </div>
    </div>;
};