import { useEffect, useState } from "react";
import styles from "./GameSettings.module.scss";

import { changeSettingInDB } from "../../../../services/gameService";
import { fetchData } from "../../../../services/fetchService";
import { getStorage, saveToStorage } from "../../../../services/storageService";

import Checkbox from "../SettingFields/Checkbox/Checkbox";
import NumberInput from "../SettingFields/NumberInput/NumberInput";

export default function GameSettings({ isLogged, setNumberOfPlayers, timerToggles }) {
    const [availableSettings, setAvailableSettings] = useState(null);
    const [currentValues, setCurrentValues] = useState(null);

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

        if (isLogged) {
            await changeSettingInDB(setting).then(res => console.log(res));
        };
        
        saveToStorage("scUserDetails", { gameSettings: newValues } );
        setCurrentValues(newValues);
        handleSpecificSettings(id, settingValue);
    };

    /**
     * Sets additional state toggles/fields for sepcific settings.
     * @param {String} id The setting id that is currently being edited.
     * @param {String|Number|Boolean} value Value taken from the input component (will be primitives).
     */
    const handleSpecificSettings = (id, value) => {
        if (id === "numberOfPlayers") {
            setNumberOfPlayers(value);
        };

        if (id === "mainTimer" || id === "individualTimers") {
            timerToggles[id](value);
        };
    };

    /**
     * Compare the currently available settings with the present settings object if available.
     * @param {Array<object>} settings The currently available settings and their respective values
     * @param {Object|undefined} localData The local storage data object if present.
     * @returns Either the value from the local storage object, or the default settings object.
     */
    const compareValues = (settings, localData) => {
        const values = {};

        if (localData && localData.gameSettings) {
            const { gameSettings } = localData;

            for (const { id, defaultValue } of settings) {
                values[id] = gameSettings[id] ? gameSettings[id] : defaultValue;
            };
        };

        return values;
    };

    useEffect(() => {
        fetchData("settings/game.json").then(res => {
            const localData = getStorage("scUserDetails");
            const values = compareValues(res, localData);

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