import { useEffect, useState } from "react";
import styles from "./GameSettings.module.scss";
import { fetchHttp } from "../../../../services/fetchService";
import { getStogare } from "../../../../services/storageService";

import Checkbox from "../SettingFields/Checkbox/Checkbox";
import NumberInput from "../SettingFields/NumberInput/NumberInput";

export default function GameSettings({ isLogged, handleLoggedState }) {
    const [availableSettings, setAvailableSettings] = useState(null);

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
        fetchHttp("settings/game.json").then(res => {
            res.content = handleValues(res.content);
            setAvailableSettings(res);
        });
        // console.log("x");
    }, [isLogged]);

    return <div className={styles.gameSettings}>
        <h3>{availableSettings && availableSettings.title}</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.content.map((el) =>  {
                const { type, title, id, value, min, disabled } = el;
                const section = availableSettings.title.replace(" ", "_").toLocaleLowerCase();
                const availableFields = {
                    checkbox: <Checkbox title={title} id={id} section={section}  value={value} disabled={disabled} key={title} />,
                    numberInput: <NumberInput title={title} id={id} section={section} min={min}  value={value} disabled={disabled} key={title} />
                };

                return availableFields[type];
            })}
        </div>
    </div>;
};