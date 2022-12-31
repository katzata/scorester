import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import UserSettings from "./UserSettings/UserSettings";
import GameSettings from "./GameSettings/GameSettings";
import Icons from "../../shared/Icons/Icons";
// import { getStorage } from "../../../services/storageService";

export default function Header({
    isLogged,
    isPlaying,
    gamePaused,
    playerTurnIndex,
    numberOfPlayers,
    handleLoggedState,
    setNumberOfPlayers,
    mainTimerVisible,
    mainTimerToggle,
    individualTimersVisible,
    individualTimersToggle
    }) {
    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [gameSettingsVisible, setGameSettingsVisible] = useState(false);

    const timerToggles = {
        mainTimer: mainTimerToggle,
        individualTimers: individualTimersToggle
    };

    useEffect(() => {

    }, []);

    return <header>
        <div className={styles.timersWrapper}>
            {(mainTimerVisible || individualTimersVisible) && <Timers
                isPlaying={isPlaying}
                gamePaused={gamePaused}
                playerTurnIndex={playerTurnIndex}
                numberOfPlayers={numberOfPlayers}
                mainTimerVisible={mainTimerVisible}
                individualTimersVisible={individualTimersVisible}
            />}
        </div>

        <h1 className={styles.headerTitle}>
            <svg width="146" height="62" viewBox="0 0 146 62">
                <use href="#headerSvgText" stroke="rgb(180, 0, 0)" strokeWidth="3"></use>
                <text id="headerSvgText" x="48%" y="58%" fill="white" dominantBaseline="middle" textAnchor="middle">Scorester</text>
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
                    <GameSettings isLogged={isLogged} handleLoggedState={handleLoggedState} setNumberOfPlayers={setNumberOfPlayers} timerToggles={timerToggles} />
                </Modal>
            </div>
        </div>
    </header>;
}