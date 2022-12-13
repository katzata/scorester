import { useEffect, useState } from "react";
import styles from "./GameSettings.module.scss";
import { fetchHttp } from "../../../../services/fetchService";
import { getStogare } from "../../../../services/storageService";

import Checkbox from "../SettingFields/Checkbox/Checkbox";
import NumberInput from "../SettingFields/NumberInput/NumberInput";

export default function GameSettings({ isLogged, handleLoggedState }) {
    const [availableSettings, setAvailableSettings] = useState(null);
    const [currentValues, setCurrentValues] = useState({});

    const handleValues = (settings, localData) => {
        if (localData && localData.gameSettings) {
            const values = {};

            for (const { id } of settings) {
                values[id] = localData.gameSettings[id];
            };

            setCurrentValues(values);
        };
        
        return settings;
    };

    useEffect(() => {
        const localData = getStogare("scUserDetails");

        if (!availableSettings) {
            fetchHttp("settings/game.json").then(res => {
                res.content = handleValues(res.content, localData);
                setAvailableSettings(res);
            });
        };

        if (isLogged) {
            setCurrentValues(localData.gameSettings);
        };
    }, [isLogged, availableSettings]);

    return <div className={styles.gameSettings}>
        <h3>{availableSettings && availableSettings.title}</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.content.map((el) =>  {
                const { type, title, id, min, disabled } = el;
                const section = availableSettings.title.replace(" ", "_").toLocaleLowerCase();
                const availableFields = {
                    checkbox: <Checkbox title={title} id={id} section={section} value={currentValues[id]} disabled={disabled} key={title} />,
                    numberInput: <NumberInput title={title} id={id} section={section} min={min} value={currentValues[id]} disabled={disabled} key={title} />
                };

                return availableFields[type];
            })}
        </div>
    </div>;
};