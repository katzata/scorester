import { useState, useContext, useEffect } from "react";
import styles from "./Header.module.scss";

import ErrorsContext from "../../../contexts/ErrorsContext";
import UserContext from "../../../contexts/UserContext";

import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import SettingsSection from "./SettingsSection/SettingsSection";
import Icons from "../../shared/Icons/Icons";
import SvgOutlinedText from "../../shared/SvgOutlinedText/SvgOutlinedText";
import useKeyPress from "../../../hooks/useKeyPress";

export default function Header() {
    const errorsContext = useContext(ErrorsContext);
    const userContext = useContext(UserContext);
    const { mainTimer, individualTimers } = userContext.userData.gameSettings;

    const [pressedKey] = useKeyPress();
    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [gameSettingsVisible, setGameSettingsVisible] = useState(false);


    const toggleUserSettings = (state) => {
        if (!state) errorsContext.dispatch({ type: "clear", payload: "errors" });
        setUserSettingsVisible(state);
    };

    const toggleGameSettings = (state) => {
        if (!state) errorsContext.dispatch({ type: "clear", payload: "errors" });
        setGameSettingsVisible(state);
    };

    useEffect(() => {
        if (userSettingsVisible && pressedKey === "cancel") {
            setUserSettingsVisible(false);
        };

        if (gameSettingsVisible && pressedKey === "cancel") {
            setGameSettingsVisible(false);
        };
    }, [pressedKey, userSettingsVisible, gameSettingsVisible, setGameSettingsVisible]);

    return <header>
        <div id="timersWrapper" className={styles.timersWrapper}>
            {(mainTimer || individualTimers) && <Timers/>}
        </div>

        <SvgOutlinedText text="Scorester" width="146" height="62"/>

        <div id="buttonsContainer" className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserSettingsVisible(true)}>
                    <Icons current={"user"}/>
                </button>

                <Modal id="userSettings" isVisible={userSettingsVisible} position="fixed" visibilityHandler={toggleUserSettings} title={"userSettings"}>
                    <SettingsSection settingsUrl="settings/user.json" title="User info"/>
                </Modal>
            </div>

            <div className={styles.buttonWrapper}>
                <button onClick={() => setGameSettingsVisible(true)}>
                    <Icons current={"cog"}/>
                </button>

                <Modal id="gameSettings" isVisible={gameSettingsVisible} position="fixed" visibilityHandler={toggleGameSettings} title={"gameSettings"}>
                    <SettingsSection settingsUrl="settings/game.json"/>
                </Modal>
            </div>
        </div>
    </header>;
}