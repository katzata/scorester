import { useContext,/*  useEffect, */ useState } from "react";
import styles from "./GameSettings.module.scss";

import { changeSettingInDB } from "../../../../services/gameService";
import { getStorage, saveToStorage } from "../../../../services/storageService";
import useFetch from "../../../../hooks/useFetch";

import UserContext from "../../../../contexts/UserContext";
// import GameContext from "../../../../contexts/UserContext";

import Checkbox from "../SettingFields/Checkbox/Checkbox";
import NumberInput from "../SettingFields/NumberInput/NumberInput";
import LoadingText from "../../../shared/LoadingText/LoadingText";

export default function GameSettings({ isLogged }) {
    const userContext = useContext(UserContext);
    // const gameContext = useContext(GameContext);
    
    const [settings, error, loading] = useFetch("settings/game.json", null, true);
    const [currentFieldValues, setCurrentFieldValues] = useState(userContext.userData.gameSettings);
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
        const newValues = {...localData.gameSettings};
        const settingValue = type === "checkbox" ? checked : value;

        newValues[id] = type === "number" ? Number(settingValue) : settingValue;
        localData.gameSettings = newValues;

        if (isLogged && !currentlyFetching.includes(id)) {
            setCurrentlyFetching([id, ...currentlyFetching]);
            await changeSettingInDB(setting).then(() => setCurrentlyFetching([...currentlyFetching].splice(id, 1)));
        };

        userContext.setData({ gameSettings: newValues });
        saveToStorage("scUserDetails", { gameSettings: newValues } );
        setCurrentFieldValues(newValues);
    };

    // /**
    //  * Merge the currently available settings with the present settings object if available.
    //  * @param {Array<object>} settings The currently available settings and their respective values.
    //  * @returns An array containing the merged settings.
    //  */
    // function mergeValues(settings) {
    //     const storageData = getStorage("scUserDetails");
    //     const currentValues = {};
    //     console.log(currentValues, settings);
    //     if (storageData && storageData.gameSettings) {
    //         const gameSettings = storageData.gameSettings;

    //         for (let i = 0; i < settings.length; i++) {
    //             const { id, defaultValue } = settings[i];
    //             const isNotDefault = typeof gameSettings[id] === typeof defaultValue && gameSettings[id] !== defaultValue;
                
    //             Object.defineProperty(currentValues, id, {
    //                 value: isNotDefault ? gameSettings[id] : defaultValue
    //             });
    //         };
    //     };

    //     return currentValues;
    // };

    // useEffect(() => {
        // if (settings) {
        //     setCurrentFieldValues(mergeValues(settings));
        // };
    // }, []);

    return <div className={styles.gameSettings}>
        <h3>Game settings</h3>

        <div className={styles.settingsSection}>
            {settings && settings.map(el =>  {
                const { type, title, id, min, disabled } = el;

                const section = "game_settings";
                const availableFields = {
                    checkbox: <Checkbox title={title} id={id} section={section} value={currentFieldValues[id]} changeHandler={changeValues} disabled={disabled} key={title} />,
                    numberInput: <NumberInput title={title} id={id} section={section} min={min} value={currentFieldValues[id]} changeHandler={changeValues} disabled={disabled} key={title} />
                };

                return availableFields[type] && availableFields[type];
            })}

            {loading && <LoadingText text="Retrieving"/>}

            {error && <>
                <h1>json fetch error :</h1>
                <span>{error.message}</span>
            </>}
        </div>
    </div>;
};