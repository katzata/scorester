import styles from "./Footer.module.scss";

import { saveToStorage } from "../../../services/storageService";

export default function Footer({ isPlaying, gamePaused, setIsPlaying, setGamePaused, mainTimerVisible, individualTimersVisible }) {
    const timersPresent = mainTimerVisible || individualTimersVisible;

    const handleIsPlayingToggle = () => {
        saveToStorage("scGameDetails", { isPlaying: !isPlaying });
        setIsPlaying(!isPlaying);
    };

    const handlePauseToggle = () => {
        saveToStorage("scGameDetails", { gamePaused: !gamePaused });
        setGamePaused(!gamePaused);
    };

    return <footer>
        <button
            className={styles.startButton}
            style={{ width: `${isPlaying && timersPresent ? 70 : 100}%` }}
            onClick={handleIsPlayingToggle}
        >
            <svg style={{ backgroundColor: `rgb(${isPlaying ? "150, 0, 0" : "0, 150, 0"})` }}>
                <use href="#startButtonSvgText" stroke={`rgb(${isPlaying ? "126, 0, 0" : "0, 126, 0"})`} strokeWidth="3"></use>
                <text id="startButtonSvgText" x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="white">
                    {isPlaying ? "STOP" : "START"}
                </text>
            </svg>
        </button>

        <button
            className={styles.pauseButton}
            style={{ width: `${isPlaying && timersPresent ? 30 : 0}%` }}
            onClick={handlePauseToggle}
        >
            <svg width="240px" height="104px" viewBox="0 0 120 104">
                <use href="#pauseButtonSvgText" stroke={`rgba(${gamePaused ? "0, 0, 0, .7" : "0, 0, 0, .7"})`} strokeWidth="3"></use>
                <text id="pauseButtonSvgText" x="49%" y="58%" textAnchor="middle" dominantBaseline="middle" fill={`rgb(${gamePaused ? "0, 150, 0" : "150, 0, 0"})`}>
                    {gamePaused ? "RESUME" : "PAUSE"}
                </text>
            </svg>
        </button>
    </footer>;
};