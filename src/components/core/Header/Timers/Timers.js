import { useCallback, useEffect, useContext } from "react";
import styles from "./Timers.module.scss";

import UserContext from "../../../../contexts/UserContext";
import GameContext from "../../../../contexts/GameContext";

import SvgTimer from "../../../shared/SvgTimer/SvgTimer";

/**
 * Component displaying all possible timers (main timer, individual timers).
 * 
 * @param {Object} props
 * @param {Boolean} props.isPlaying
 * @param {Boolean} props.gamePaused
 * @param {Number} props.playerTurnIndex
 * @param {Number} props.numberOfPlayers
 * @param {Boolean} props.gameSettings.mainTimer
 * @param {Boolean} props.gameSettings.individualTimers
 * 
 * @props isPlaying - The current playing state.
 * @props gamePaused - Indcates wether the game is paused or not.
 * @props playerTurnIndex - Indicates the current player turn.
 * @props numberOfPlayers - Indicates the current number of players.
 * @props gameSettings.mainTimer - Indicates the main timer visibility.
 * @props gameSettings.individualTimers - Indicates the individual timers visibility.
 */
export default function Timers() {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { gameSettings } = userContext.userData;
    const { isPlaying, gamePaused, playerTurnIndex, mainTimer, individualTimers } = gameContext.gameData;

    /**
     * Handle all available timers (main and individual).
     */
    const handleTimers = useCallback(() => {
        const mainTimerVisible = gameSettings.mainTimer;
        const individualTimersVisible = gameSettings.individualTimers;
        
        if (mainTimerVisible || individualTimersVisible) {
            gameContext.dispatch({ type: "timers_update", payload: { mainTimerVisible, individualTimersVisible } });
        };
    }, [gameContext, gameSettings.mainTimer, gameSettings.individualTimers]);

    useEffect(() => {
        if (isPlaying && !gamePaused) {
            let timersInterval = setInterval(handleTimers, 1000);
            return () => clearInterval(timersInterval);
        };
    }, [isPlaying, gamePaused, handleTimers]);

    return <section className={styles.timersSection}>
        { gameSettings.mainTimer && <SvgTimer id="gameTimer" digits={mainTimer}/> }

        { gameSettings.individualTimers && <div className={styles.individualTimersContainer}>
            <svg className={styles.timerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <path d="m44.4699707 18.7250366h-20.0199585c-3.0500488 0-5.5300293 2.4899902-5.5300293 5.539978v20.0100098c0 3.0499878 2.4799805 5.539978 5.5300293 5.539978h20.0199585c3.0500488 0 5.5300293-2.4899902 5.5300293-5.539978v-20.0100098c0-3.0499877-2.4799805-5.539978-5.5300293-5.539978zm-15.8999634 13.2799683c-2.0100098 0-3.6400146-1.6300049-3.6400146-3.6300049 0-2.0099487 1.6300049-3.6399536 3.6400146-3.6399536 2 0 3.6300049 1.6300049 3.6300049 3.6399536 0 2-1.6300049 3.6300049-3.6300049 3.6300049zm11.7799683 11.790039c-2 0-3.6300049-1.6300049-3.6300049-3.6300049 0-2.0100098 1.6300049-3.6400146 3.6300049-3.6400146 2.0100098 0 3.6300049 1.6300049 3.6300049 3.6400146 0 2.0000001-1.6199951 3.6300049-3.6300049 3.6300049z" fill="#ffffff"></path>
                <path d="m24.4500122 16.7250366h8.6300049v-9.0100097c0-3.0499878-2.4800415-5.5300293-5.5300293-5.5300293h-20.0200195c-3.0499878 0-5.5299683 2.4800415-5.5299683 5.5300293v20.0200195c0 3.0499878 2.4799805 5.5299683 5.5299683 5.5299683h9.3900146v-9c0-4.1599732 3.3800049-7.5399781 7.5300293-7.5399781zm-1.0100098-8.5300293c2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049-2.0100098 0-3.6400146-1.6199951-3.6400146-3.6300049 0-2 1.6300049-3.6300049 3.6400146-3.6300049zm-11.790039 19.0500489c-2.0099487 0-3.6399536-1.6200562-3.6399536-3.6300049 0-2.0100098 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6199951 3.6300049 3.6300049 0 2.0099487-1.6300049 3.6300049-3.6300049 3.6300049zm0-11.7900391c-2.0099487 0-3.6399536-1.6199951-3.6399536-3.6300049 0-2 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049z" fill="#ffffff"></path>
            </svg>

            <div className={styles.individualTimers}>
                {individualTimers && individualTimers.map((timer, idx) => {
                    const basePosition = idx * 100;
                    const offset = playerTurnIndex * 100;
                    const offsetToggle = playerTurnIndex <= idx + 1;
                    const position = offsetToggle ? basePosition - offset : basePosition + 100;

                    return <SvgTimer
                        id={`individual${idx}`}
                        digits={timer}
                        width="70"
                        height="100%"
                        style={{ transform: `translateY(${position}%)`, zIndex: offsetToggle ? "0" : "-1" }}
                        key={`individual${idx}`}
                    />
                })}
            </div>
        </div>}
    </section>;
};