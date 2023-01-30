import { useState, useContext } from "react";
import styles from "./Header.module.scss";

import UserContext from "../../../contexts/UserContext";

import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import SettingsSection from "./SettingsSection/SettingsSection";
import Icons from "../../shared/Icons/Icons";
import SvgOutlinedText from "../../shared/SvgOutlinedText/SvgOutlinedText";

export default function Header() {
    const userContext = useContext(UserContext);
    const { mainTimer, individualTimers } = userContext.userData.gameSettings;
    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [gameSettingsVisible, setGameSettingsVisible] = useState(false);

    return <header>
        <div className={styles.timersWrapper}>
            {(mainTimer || individualTimers) && <Timers/>}
        </div>

        <SvgOutlinedText text="Scorester" width="146" height="62"/>

        <div className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserSettingsVisible(true)}>
                    <Icons current={"user"}/>
                </button>

                <Modal isVisible={userSettingsVisible} position="fixed" visibilityHandler={setUserSettingsVisible}>
                    <SettingsSection settingsUrl="settings/user.json"/>
                </Modal>
            </div>

            <div className={styles.buttonWrapper}>
                <button onClick={() => setGameSettingsVisible(true)}>
                    <Icons current={"cog"}/>
                </button>

                <Modal isVisible={gameSettingsVisible} position="fixed" visibilityHandler={setGameSettingsVisible} options={"gameSettings"}>
                    <SettingsSection settingsUrl="settings/game.json"/>
                </Modal>
            </div>
        </div>
    </header>;
}