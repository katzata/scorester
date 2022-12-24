import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import UserSettings from "./UserSettings/UserSettings";
import GameSettings from "./GameSettings/GameSettings";
import Icons from "../../shared/Icons/Icons";
import { getStorage } from "../../../services/storageService";

export default function Header({ isLogged, numberOfPlayers, handleLoggedState, setNumberOfPlayers }) {
    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [gameSettingsVisible, setGameSettingsVisible] = useState(false);
    const [mainTimerVisible, setMainTimerVisible] = useState(false);
    const [individualTimersVisible, setIndividualTimersVisible] = useState(false);

    const timerHandlers = {
        mainTimer: setMainTimerVisible,
        individualTimers: setIndividualTimersVisible
    };

    useEffect(() => {
        const localData = getStorage("scUserDetails");
        
        if (localData) {
            const { mainTimer, individualTimers} = localData.gameSettings;

            setMainTimerVisible(mainTimer);
            setIndividualTimersVisible(individualTimers);
        }
    }, [isLogged]);

    return <header>
        <Timers numberOfPlayers={numberOfPlayers} mainTimerVisible={mainTimerVisible} individualTimersVisible={individualTimersVisible}/>

        <h1 className={styles.headerTitle}>
            <svg width="144" height="62" viewBox="0 0 144 62">
                <text x="48%" y="58%" width="100%" fill="white" dominantBaseline="middle" textAnchor="middle">Scorester</text>
            </svg>
        </h1>

        <div className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserSettingsVisible(true)}>
                    <Icons current={"user"}/>
                </button>

                <Modal isVisible={userSettingsVisible} position="fixed" visibilityHandler={setUserSettingsVisible}>
                    <UserSettings isLogged={isLogged} handleLoggedState={handleLoggedState} />
                </Modal>
            </div>

            <div className={styles.buttonWrapper}>
                <button onClick={() => setGameSettingsVisible(true)}>
                    <Icons current={"cog"}/>
                </button>

                <Modal isVisible={gameSettingsVisible} position="fixed" visibilityHandler={setGameSettingsVisible} options={"gameSettings"}>
                    <GameSettings isLogged={isLogged} handleLoggedState={handleLoggedState} setNumberOfPlayers={setNumberOfPlayers} timerHandlers={timerHandlers} />
                </Modal>
            </div>
        </div>
    </header>;
}