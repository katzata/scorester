import { useState/* , useContext */ } from "react";
import styles from "./Header.module.scss";

// import UserContext from "../../../contexts/UserContext";

import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import UserSettings from "./UserSettings/UserSettings";
import GameSettings from "./GameSettings/GameSettings";
import Icons from "../../shared/Icons/Icons";
import SvgOutlinedText from "../../shared/SvgOutlinedText/SvgOutlinedText";

/**
 * 
 * @param {Object} props
 * @param {Boolean} props.isLogged
 * @param {Boolean} props.isPlaying
 * @param {Boolean} props.gamePaused
 * @param {Number} props.playerTurnIndex
 * @param {Number} props.numberOfPlayers
 * @param {Function} props.handleLoggedState
 * @param {Function} props.setNumberOfPlayers
 * @param {Boolean} props.mainTimerVisible
 * @param {Function} props.mainTimerToggle
 * @param {Boolean} props.individualTimersVisible
 * @param {Function} props.individualTimersToggle
 */
export default function Header({
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
    
    return <header>
        <div className={styles.timersWrapper}>
            {/* {(mainTimerVisible || individualTimersVisible) && <Timers
                isPlaying={isPlaying}
                gamePaused={gamePaused}
                playerTurnIndex={playerTurnIndex}
                numberOfPlayers={numberOfPlayers}
                mainTimerVisible={mainTimerVisible}
                individualTimersVisible={individualTimersVisible}
            />} */}
        </div>

        <SvgOutlinedText text="Scorester" width="146" height="62"/>

        <div className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserSettingsVisible(true)}>
                    <Icons current={"user"}/>
                </button>

                <Modal isVisible={userSettingsVisible} position="fixed" visibilityHandler={setUserSettingsVisible}>
                    <UserSettings handleLoggedState={handleLoggedState} />
                </Modal>
            </div>

            <div className={styles.buttonWrapper}>
                <button onClick={() => setGameSettingsVisible(true)}>
                    <Icons current={"cog"}/>
                </button>

                <Modal isVisible={gameSettingsVisible} position="fixed" visibilityHandler={setGameSettingsVisible} options={"gameSettings"}>
                    <GameSettings handleLoggedState={handleLoggedState} setNumberOfPlayers={setNumberOfPlayers} timerToggles={timerToggles} />
                </Modal>
            </div>
        </div>
    </header>;
}