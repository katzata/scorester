import { useEffect, useState } from "react";
import styles from "./UserSettings.module.scss";
import { fetchData } from "../../../../services/fetchService";
import { logout } from "../../../../services/userService";
import { getStorage } from "../../../../services/storageService";

import Icons from "../../../shared/Icons/Icons";
import Auth from "../SettingFields/Auth/Auth";
import Checkbox from "../SettingFields/Checkbox/Checkbox";

export default function UserSettings({ isLogged, handleLoggedState }) {
    const [availableSettings, setAvailableSettings] = useState(null);
    const [currentValues, setCurrentValues] = useState(null);

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

    const changeValues = (setting, value) => {
        const newValues = {...currentValues};
        newValues[setting] = value;
        
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