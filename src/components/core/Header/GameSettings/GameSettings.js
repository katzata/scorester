import { useEffect, useState } from "react";
import styles from "./GameSettings.module.scss";
import { fetchData } from "../../../../services/fetchService";
import { getStorage/* , setStorage */ } from "../../../../services/storageService";

import Checkbox from "../SettingFields/Checkbox/Checkbox";
import NumberInput from "../SettingFields/NumberInput/NumberInput";

export default function GameSettings({ isLogged, setNumberOfPlayers, timerHandlers }) {
    const [availableSettings, setAvailableSettings] = useState(null);
    const [currentValues, setCurrentValues] = useState(null);

    const handleValues = (settings, localData) => {
        const values = {};

        if (localData && localData.gameSettings) {
            const { gameSettings } = localData;

            for (const { id, defaultValue } of settings) {
                values[id] = gameSettings[id] ? gameSettings[id] : defaultValue;
            };
        };

        return values;
    };

    const changeValues = (setting, value) => {
        const newValues = {...currentValues};
        newValues[setting] = value;
        setCurrentValues(newValues);

        if (setting === "numberOfPlayers") {
            setNumberOfPlayers(value);
        };

        if (setting === "mainTimer" || setting === "individualTimers") {
            timerHandlers[setting](value);
        };
    };

    useEffect(() => {
        /**
         * The settings are taken from a json file to simplify the addition of new options.
         */
        fetchData("settings/game.json").then(res => {
            const localData = getStorage("scUserDetails");
            const values = handleValues(res, localData);

            setCurrentValues(values);
            setAvailableSettings(res);
        });
    }, [isLogged]);

    return <div className={styles.gameSettings}>
        <h3>Game settings</h3>

        <div className={styles.settingsSection}>
            {availableSettings && availableSettings.map(el =>  {
                const { type, title, id, min, disabled } = el;
                const section = "game_settings";
                const availableFields = {
                    checkbox: <Checkbox title={title} id={id} section={section} value={currentValues[id]} changeHandler={changeValues} disabled={disabled} key={title} />,
                    numberInput: <NumberInput title={title} id={id} section={section} min={min} value={currentValues[id]} changeHandler={changeValues} disabled={disabled} key={title} />
                };

                return availableFields[type];
            })}
        </div>
    </div>;
};