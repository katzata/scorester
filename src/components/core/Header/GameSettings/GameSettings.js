import { useEffect, useState } from "react";
import styles from "./UserSettings.module.scss";
import { fetchHttp } from "../../../../services/fetchService";
import { login, changeSetting } from "../../../../services/userService";

import SettingFields from "../SettingFields/SettingFields";

export default function UserSettings() {
    const [availableSettings, setAvailableSettings] = useState(null);

    useEffect(() => {
        fetchHttp("settings/user.json").then(res => {
            setAvailableSettings(res);
        });
    }, []);

    return <div className={styles.userSettings}>
        <h3>{availableSettings && availableSettings.title}</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.content.map((el, idx) =>  {
                const {type, subType, title, id = ""} = el;
                const section = availableSettings.title.replace(" ", "_").toLocaleLowerCase();

                return <div className={styles.setting} key={idx}>
                    {fields[type] && <SettingFields id={id} section={section} title={title}/>/* fields[type]({id, section, title}) */}
                </div>;
            })}
        </div>
    </div>;
};