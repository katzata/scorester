import { useEffect, useState } from "react";
import styles from "./UserSettings.module.scss";
import { fetchHttp } from "../../../../services/fetchService";
import { logout } from "../../../../services/userService";
import { getStogare } from "../../../../services/storageService";

import Icons from "../../../shared/Icons/Icons";
import Auth from "../SettingFields/Auth/Auth";
import NumberInput from "../SettingFields/NumberInput/NumberInput";
import Checkbox from "../SettingFields/Checkbox/Checkbox";

export default function UserSettings({ isLogged, handleLoggedState }) {
    const [availableSettings, setAvailableSettings] = useState(null);
    
    const availableFields = {
        login: ({ type, handleLoggedState }) => <Auth type={type} callback={handleLoggedState} key={type} />,
        checkbox: ({ title, id, section, value, disabled }) => <Checkbox title={title} id={id} section={section} value={value} disabled={disabled} key={title} />,
        numberInput: ({ title, id, section, value, min, disabled }) => <NumberInput title={title} id={id} section={section} min={min} value={value} disabled={disabled} key={title} />
    };

    const handleValues = (settings) => {
        const localData = getStogare("scUserDetails");

        if (localData && localData.gameSettings) {
            for (const setting of settings) {
                setting.value = localData.gameSettings[setting.id];
            };
        };

        return settings;
    };
    
    useEffect(() => {
        fetchHttp("settings/user.json").then(res => {
            res.content = handleValues(res.content);
            setAvailableSettings(res)
        });
    }, [isLogged]);

    return <div className={styles.userSettings}>
        <h3>{availableSettings && availableSettings.title}</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.content.map((el, idx) =>  {
                const { type, title, id = "" } = el;

                if (idx === 0) {
                    if (isLogged) {
                        return <div className={styles.loggedUserSection} key={idx}>
                            <div className={styles.userAvatarContainer}>
                                <Icons current={"user"}/>
                            </div>

                            <button id="logout" onClick={() => logout(handleLoggedState)}>LOGOUT</button>
                        </div>;
                    } else {
                        return availableFields[type]({ type, handleLoggedState });
                    };
                } else {
                    const { value, min } = el;
                    const section = availableSettings.title.replace(" ", "_").toLocaleLowerCase();
    
                    return availableFields[type]({ title, id, section, value, min });
                };
            })}
        </div>
    </div>;
};