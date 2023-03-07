import { useContext, useEffect } from "react";
import styles from "./Footer.module.scss";

import GameContext from "../../../contexts/GameContext";
import UserContext from "../../../contexts/UserContext";
import useKeyPress from "../../../hooks/useKeyPress";

export default function Footer({ endGameModalVisibilityHandler }) {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { mainTimer, individualTimers } = userContext.userData.gameSettings;
    const { isPlaying, gamePaused } = gameContext.gameData;
    const { setData } = gameContext;
    const timersPresent = mainTimer || individualTimers;

    const [pressedKey] = useKeyPress();

    /**
     * Start the game if the isPlaying context toggle is false.
     * If the isPlaying context toggle is true, show the endGameModal component.
     */
    const handleIsPlayingToggle = () => {
        if (!isPlaying) {
            setData({ type: "start_game", payload: { mainTimer, individualTimers } });
        } else {
            setData({ type: "pause_game", payload: { mainTimer, individualTimers } });
            endGameModalVisibilityHandler(true);
        };
    };

    /**
     * Pause and unpause the game.
     */
    const handlePauseToggle = () => {
        setData({ type: !gamePaused ? "pause_game" : "resume_game" });
    };

    const startButtonStyles = {
        width: `${isPlaying && timersPresent ? 68 : 100}%`,
        backgroundColor: `rgb(${isPlaying ? "150, 0, 0" : "0, 150, 0"})`
    };

    const pauseButtonStyles = {
        width: `${isPlaying && timersPresent ? 32 : 0}%`,
        backgroundColor: "#FFD000"
    };

    useEffect(() => {
        if (isPlaying && pressedKey === "pause") {
            setData({ type: !gamePaused ? "pause_game" : "resume_game" });
        };
    }, [pressedKey, setData, isPlaying, gamePaused]);

    return <footer>
        <button
            id="startButton"
            className={styles.startButton}
            style={startButtonStyles}
            onClick={handleIsPlayingToggle}
        >
            <svg width="184px" height="104px" viewBox="0 0 92 104">
                <use href="#startButtonSvgText" stroke={`rgb(${isPlaying ? "126, 0, 0" : "0, 126, 0"})`} strokeWidth="4"></use>
                <text id="startButtonSvgText" x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="white">
                    {isPlaying ? "Stop" : "Start"}
                </text>
            </svg>
        </button>

        <button
            id="pauseButton"
            className={styles.pauseButton}
            style={pauseButtonStyles}
            onClick={handlePauseToggle}
        >
            <svg width="240px" height="104px" viewBox="0 0 120 104">
                <use href="#pauseButtonSvgText" stroke={`rgba(${gamePaused ? "0, 0, 0, .7" : "0, 0, 0, .7"})`} strokeWidth="4"></use>

                <text id="pauseButtonSvgText" x="49%" y="58%" textAnchor="middle" dominantBaseline="middle" fill={`rgb(${gamePaused ? "0, 150, 0" : "150, 0, 0"})`}>
                    {gamePaused ? "Resume" : "Pause"}
                </text>
            </svg>
        </button>
    </footer>;
};