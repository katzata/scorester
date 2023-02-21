import { useContext } from "react";
import styles from "./SettingsSection.module.scss";

import UserContext from "../../../../contexts/UserContext";
import GameContext from "../../../../contexts/GameContext";
import ErrorsContext from "../../../../contexts/ErrorsContext";
import useFetch from "../../../../hooks/useFetch";
import { capitalize } from "../../../../utils/utils";

import Auth from "../Auth/Auth";
import Checkbox from "../SettingFields/Checkbox/Checkbox";
import NumberInput from "../SettingFields/NumberInput/NumberInput";
import LoadingText from "../../../shared/LoadingText/LoadingText";

/**
 * @param {Object} props
 * @param {String} props.settingsUrl
 * @props settingsUrl - A url for the initial settings json. Will be fetched once.
 */
export default function SettingsSection({ settingsUrl, title }) {
    let settingsSection = settingsUrl.split(".")[0].split("/");
    const sectionTitle = title || `${capitalize(settingsSection[1])} settings`;
    settingsSection[0] = `S${settingsSection[0].slice(1)}`;
    settingsSection = settingsSection.reverse().join("");
    
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const errorsContext = useContext(ErrorsContext);
    const { isLogged } = userContext.userData;
    const sectionEndpoint = `/${settingsSection}`;
    const values = userContext.userData[settingsSection];

    const [settings, error, loading] = useFetch(settingsUrl, null, true);
    const [settingsChanged, changedError, changedLoading, fetchData] = useFetch();
    
    /**
     * Extract the necessary values from the element in order to update them.
     * @param {HTMLElement} setting The HTML element whose value is currently being updated.
     */
    const handleSettingValue = (setting) => {
        const { type, id, checked, value } = setting;
        const newValues = {...values};
        const settingValue = type === "checkbox" ? checked : value;

        newValues[id] = type === "number" ? Number(settingValue) : settingValue;
        setValues(newValues);

        if (id === "numberOfPlayers") {
            gameContext.dispatch({ type: "number_of_players", payload: Number(value) });
        };
    };

    /**
     * Sets the current user setting values.
     * If the user is logged in it makes a call to the server to update the values in the database.
     * Async in order to await/prevent saving to the database until the request is complete.
     * @param {Object} newValues An updated userSettings object.
     */
    const setValues = async (newValues) => {
        if (isLogged) await saveToDb(newValues);
        userContext.setData({ [settingsSection]: newValues });
    };

    /**
     * Send the values to the database.
     * @param {Object} newValues An updated userSettings object.
     * @returns The fetch function in order to use await inside the parent function.
     */
    const saveToDb = (newValues) => {
        const body = new URLSearchParams(newValues);

        return fetchData(sectionEndpoint, body).then(res => {
            const { changedRows, message, warningCount } = res;

            if (changedRows === 0 && warningCount !== 0) {
                console.warn(settingsChanged, changedError, message)
                errorsContext.dispatch({type: "add_warnings", payload: [{ tag: "connection", subTag: "api", text: "No connection to the server!" }] });
            };
        });
    };
    
    return <div className={styles.settingsSection}>
        <h3>{sectionTitle}</h3>

        {settings && settings.map((setting, idx) =>  {
            const { type, title, id, min } = setting;

            const availableFields = {
                login: <Auth
                    type={type}
                    disabled={changedLoading}
                    key={`user${idx}`}
                />,
                checkbox: <Checkbox
                    title={title}
                    id={id}
                    section={settingsSection}
                    value={values[id]}
                    changeHandler={handleSettingValue}
                    disabled={changedLoading}
                    key={`user${idx}`}
                />,
                numberInput: <NumberInput
                    title={title}
                    id={id}
                    section={settingsSection}
                    min={min}
                    value={values[id]}
                    changeHandler={handleSettingValue}
                    disabled={changedLoading}
                    key={`user${idx}`}
                />
            };
            
            return availableFields[type];
        })}

        {loading && <LoadingText text="Retrieving"/>}

        {error && <>
            <h1>json fetch error :</h1>
            <span>error</span>
        </>}
    </div>;
};