import { /* useEffect,  */useState } from "react";
import styles from "./Header.module.scss";

import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import UserSettings from "./UserSettings/UserSettings";
import GameSettings from "./GameSettings/GameSettings";
import Icons from "../../shared/Icons/Icons";
import { getStogare } from "../../../services/storageService";

export default function Header({ isLogged, handleLoggedState, setNumberOfPlayers }) {
    const { gameSettings } = getStogare("scUserDetails");

    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [gameSettingsVisible, setGameSettingsVisible] = useState(false);
    const [mainTimerVisible, setMainTimerVisible] = useState(gameSettings.mainTimer || false);
    const [individualTimersVisible, setIndividualTimersVisible] = useState(gameSettings.individualTimers || false);

    const timerHandlers = {
        mainTimer: setMainTimerVisible,
        individualTimers: setIndividualTimersVisible
    };

    // useEffect(() => {
    //     // console.log("yay");
    // }, [isLogged])

    return <header>
        {(mainTimerVisible || individualTimersVisible) && <Timers currentPlayers={"currentPlayers"} mainTimerVisible={mainTimerVisible} individualTimersVisible={individualTimersVisible}/>}

        <h1 className={styles.headerTitle}>Scorester</h1>

        <div className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserSettingsVisible(true)}>
                    <Icons current={"user"}/>
                </button>

                <Modal isVisible={userSettingsVisible} visibilityHandler={setUserSettingsVisible}>
                    <UserSettings isLogged={isLogged} handleLoggedState={handleLoggedState} />
                </Modal>
            </div>

            <div className={styles.buttonWrapper}>
                <button onClick={() => setGameSettingsVisible(true)}>
                    <Icons current={"cog"}/>
                </button>

                <Modal isVisible={gameSettingsVisible} visibilityHandler={setGameSettingsVisible} options={"gameSettings"}>
                    <GameSettings isLogged={isLogged} handleLoggedState={handleLoggedState} setNumberOfPlayers={setNumberOfPlayers} timerHandlers={timerHandlers} />
                </Modal>
            </div>
        </div>
    </header>;
}