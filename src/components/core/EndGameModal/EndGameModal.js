import { useContext, useEffect } from "react";
import styles from "./EndGameModal.module.scss";

import UserContext from "../../../contexts/UserContext";
import GameContext from "../../../contexts/GameContext";

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
    const { individualTimers, mainTimer, scores, playerTurnIndex } = gameContext.gameData;
    const { gameSettings } = useContext(UserContext).userData;

    const endGameScores = [...scores];
    let totalTurns = 0;

    for (let i = 0; i < endGameScores.length; i++) {
        const increment = endGameScores[i].scores.length || 0;

        totalTurns += increment;
        endGameScores[i].turns = increment;
        endGameScores[i].highestScore = Math.max(...endGameScores[i].scores);
        endGameScores[i].timer = individualTimers[i].total;
    };


    const sortedScores = [...endGameScores].sort((a, b) => b.scoreTotal - a.scoreTotal);
    const highestScored = [...endGameScores].sort((a, b) => b.highestScore - a.highestScore)[0];
    const lowestTime = [...endGameScores].sort((a, b) => a.timer - b.timer)[0];

    const winnerIndex = playerTurnIndex - 1 < 0 ? endGameScores.length - 1 : playerTurnIndex - 1;
    const winner = gameSettings.scoreTarget > 0 ? endGameScores[winnerIndex] : sortedScores[0];

    const winnerStats = [
        ["Points", <p>{winner.scoreTotal}</p>],
        ["Turns", <p>{winner.turns}</p>],
        ["Playtime", gameSettings.individualTimers && <SvgTimer id={"individual-resW"} digits={winner.timer}/>]
    ];
console.log(individualTimers, scores);
    const gameStats = [
        ["Game points", <p>{endGameScores.map(el => el.scoreTotal).reduce((a, b) => a + b)}</p>],
        ["Turns", <p>{totalTurns}</p> ],
        ["Game time", (gameSettings.mainTimer || gameSettings.individualTimers) && <SvgTimer id={"individual-resG"} digits={gameSettings.mainTimer ? mainTimer : individualTimers.reduce((a, b) => (a.total + a.elapsed) + (b.total + b.elapsed))}/>]
    ];

    /**
     * Handles a stat array (winnerStats, gameStats).
     * @param {Array.<Array.<any>>} stats A stats array do be displayed.
     * @returns A StatRow component containing the necessary data.
     */
    function handleStats(stats) {
        return [...stats]
            .filter(([stat, el]) => el && [stat, el])
            .map(([stat, el]) => <StatRow title={stat} key={stat}>{el}</StatRow>);
    };

    /**
     * Close the endgame modal and reset the game data.
     */
    function closeModalAndResume() {
        gameContext.setData({ type: "resume_game" });
        visibilityHandler(false);
    };

    /**
     * Close the endgame modal and reset the game data.
     */
    function closeModalAndEnd() {
        gameContext.setData({ type: "stop_game" });
        visibilityHandler(false);
    };

    useEffect(() => {
        // console.log(isVisible);
    }, [isVisible]);

    return <div id="endGameModal" className={styles.endGameModal}>
        <Modal isVisible={isVisible} position="absolute">
            <div className={styles.scoreDetails}>
                <div className={styles.topContainer}>
                    <button id="backToGame" className={styles.topButton} onClick={closeModalAndResume}>BACK</button>
                    <SvgOutlinedText text="Results" width="218" height="86" strokeWidth="6" />
                    <button id="endGame" className={styles.topButton} onClick={closeModalAndEnd}>END</button>
                </div>

                <div id="scoreDetails" className={styles.scoreDetailsInternal}>
                    <div className={styles.scoreDetailsTop}>
                        <StatsSection title="Winner">
                            <h4 className={styles.winnerName}>{winner.name}</h4>
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
                            <p>
                                {!isNaN(highestScored.highestScore) && highestScored.highestScore >= 0 ? highestScored.highestScore : 0 }
                                <span> pts.</span>
                            </p>
                        </StatsSection>

                        {gameSettings.individualTimers && <StatsSection title="Lowest time">
                            <h4 className={styles.winnerName}>{lowestTime.name}</h4>
                            <SvgTimer id="lowestTime" digits={lowestTime.timer}/>
                        </StatsSection>}
                    </div>

                    <div id="ranking" className={styles.ranking}>
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