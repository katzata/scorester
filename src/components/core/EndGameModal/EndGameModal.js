import { useContext } from "react";
import styles from "./EndGameModal.module.scss";

import GameContext from "../../../contexts/GameContext";
import { getStorage } from "../../../utils/localStorage";

import Modal from "../../shared/Modal/Modal";
import SvgTimer from "../../shared/SvgTimer/SvgTimer";
import StatRow from "./StatRow/StatRow";
import StatsSection from "./StatsSection/StatsSection";
import SvgOutlinedText from "../../shared/SvgOutlinedText/SvgOutlinedText";
import RankRow from "./RankRow/RankRow";

/**
 * Component handling the endgame summary.
 * @param {Object} props
 * @param {Boolean} props.isVisible
 * @param {Function} props.visibilityHandler
 * 
 * @component
 * @param {Boolean} props.isVisible The current modal visibility state.
 * @param {Function} props.visibilityHandler Handles the modal visibility.
 * @returns A summary of the finished game.
 */
export default function EndGameModal({ isVisible, visibilityHandler }) {
    const gameContext = useContext(GameContext);
    const { individualTimers , mainTimer, scores } = gameContext.gameData;

    const data = getStorage("scGameDetails");
    let totalTurns = 0;

    for (let i = 0; i < scores.length; i++) {
        const increment = scores[i].scores.length || 0;

        if (scores[i].scores.length < 1) {
            scores[i].scores = [0];
        };
        
        scores[i].scoreTotal = scores[i].scores.reduce((a, b) => a + (b || 0));
        totalTurns += increment;
        scores[i].turns = increment;
        scores[i].highestScore = Math.max(...scores[i].scores);
        scores[i].timer = individualTimers[i];

        if (individualTimers) {
            data.scores[i].timer = data.individualTimers[i];
        };
    };
    const sortedScores = [...scores].sort((a, b) => b.scoreTotal - a.scoreTotal);
    const highestScored = [...scores].sort((a, b) => b.highestScore - a.highestScore)[0];
    const lowestTime = [...scores].sort((a, b) => a.timer - b.timer)[0];

    const winnerStats = [
        ["Points", <p>{sortedScores[0].scoreTotal}</p>],
        ["Playtime", individualTimers && <SvgTimer id={"individual-resW"} digits={sortedScores[0].timer}/>],
        ["Turns", <p>{sortedScores[0].turns}</p> ]
    ];

    const gameStats = [
        ["Game points", mainTimer && <p>{scores.map(el => el.scoreTotal).reduce((a, b) => a + b)}</p>],
        ["Game time", individualTimers && <SvgTimer id={"individual-resG"} digits={mainTimer}/>],
        ["Turns", <p>{totalTurns}</p> ]
    ];
    
    /**
     * Handles a stat array (winnerStats, gameStats).
     * @param {Array.<Array.<any>>} stats A stats array do be displayed.
     * @returns A StatRow component containing the necessary data.
     */
    function handleStats(stats) {
        return stats.filter(([stat, el]) => el && [stat, el])
            .map(([stat, el]) => <StatRow title={stat} key={stat}>
                {el}
            </StatRow>
        );
    };

    /**
     * Close the endgame modal and reset the game data.
     */
    function closeModalAndResume() {
        gameContext.dispatch({ type: "resume_game" });
        visibilityHandler(false);
    };

    /**
     * Close the endgame modal and reset the game data.
     */
    function closeModalAndEnd() {
        gameContext.dispatch({ type: "stop_game" });
        visibilityHandler(false);
    };

    return <div className={styles.endGameModal}>
        <Modal isVisible={isVisible} position="absolute">
            <div className={styles.scoreDetails}>
                <div className={styles.topContainer}>
                    <button className={styles.topButton} onClick={closeModalAndResume}>BACK</button>
                    <SvgOutlinedText text="Results" width="218" height="86" strokeWidth="6" />
                    <button className={styles.topButton} onClick={closeModalAndEnd}>END</button>
                </div>

                <div className={styles.scoreDetailsInternal}>
                    <div className={styles.scoreDetailsTop}>
                        <StatsSection title="Winner">
                            <h4 className={styles.winnerName}>{sortedScores[0].name}</h4>

                            {handleStats(winnerStats)}
                        </StatsSection>

                        <StatsSection title="Game stats">
                            <h4 className={styles.winnerName}>Totals</h4>
                            
                            {handleStats(gameStats)}
                        </StatsSection>
                    </div>

                    <div className={styles.playerStats}>
                        <StatsSection title="Most scored">
                            <h4 className={styles.winnerName}>{highestScored.name}</h4>
                            <p>{highestScored.highestScore} <span>pts.</span></p>
                        </StatsSection>

                        {individualTimers && <StatsSection title="Lowest time">
                            <h4 className={styles.winnerName}>{lowestTime.name}</h4>
                            <SvgTimer id="lowestTime" digits={lowestTime.timer}/>
                        </StatsSection>}
                    </div>
                    
                    <div className={styles.ranking}>
                        {sortedScores && sortedScores.map((player, idx) => <RankRow
                            position={idx + 1}
                            playerName={player.name}
                            score={player.scoreTotal}
                            timer={player.timer}
                            key={`results${idx + 1}`}
                        />)}
                    </div>
                </div>
            </div>
        </Modal>
    </div>;
};