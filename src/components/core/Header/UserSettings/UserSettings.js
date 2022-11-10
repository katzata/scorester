import { useEffect, useState } from "react";
import styles from "./UserSettings.module.scss";
import { fetchHttp } from "../../../../services/fetchService";

import SettingFields from "../SettingFields/SettingFields";

export default function UserSettings() {
    const [availableSettings, setAvailableSettings] = useState(null);
    
    useEffect(() => {
        fetchHttp("settings/user.json").then(res => setAvailableSettings(res));
    }, []);

    return <div className={styles.userSettings}>
        <h3>{availableSettings && availableSettings.title}</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.content.map((el, idx) =>  {
                const {type, title, id = ""} = el;
                const section = availableSettings.title.replace(" ", "_").toLocaleLowerCase();

                return <SettingFields
                    type={type}
                    id={id}
                    section={section}
                    title={title}
                    key={idx}
                />;
            })}
        </div>
    </div>;
};