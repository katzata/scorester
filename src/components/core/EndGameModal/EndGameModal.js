import styles from "./EndGameModal.module.scss";

import { getStorage } from "../../../services/storageService";

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
export default function EndGameModal({ isVisible, visibilityHandler, mainTimerVisible, individualTimersVisible }) {
    const data = getStorage("scGameDetails");
    const mainTimer = data && data.mainTimer;
    let scores = data && data.scores;
    let totalTurns = 0;
    let highestScored = {};
    let lowestTime = {};

    for (let i = 0; i < data.scores.length; i++) {
        const increment = data.scores[i].scores.length || 0;

        if (data.scores[i].scores.length < 1) {
            data.scores[i].scores = [0];
        };
        
        data.scores[i].scoreTotal = data.scores[i].scores.reduce((a, b) => a + (b || 0))
        totalTurns += increment;
        data.scores[i].turns = increment;
        data.scores[i].highestScore = Math.max(...data.scores[i].scores);

        if (individualTimersVisible) {
            data.scores[i].timer = data.individualTimers[i];
        };
    };

    scores = scores.sort((a, b) => b.scoreTotal - a.scoreTotal);
    highestScored = [...scores].sort((a, b) => b.highestScore - a.highestScore)[0];
    lowestTime = [...scores].sort((a, b) => a.timer.reduce((a, b) => a + b) - b.timer.reduce((a, b) => a + b))[0]

    const winnerStats = [
        ["Points", <p>{formatScores(scores[0].scores)}</p>],
        ["Playtime", individualTimersVisible && <SvgTimer id={"individual-resW"} digits={scores[0].timer}/>],
        ["Turns", <p>{scores[0].turns}</p> ]
    ];

    const gameStats = [
        ["Game points", mainTimerVisible && <p>{scores.map(el => el.scoreTotal).reduce((a, b) => a + b)}</p>],
        ["Game time", individualTimersVisible && <SvgTimer id={"individual-resG"} digits={mainTimer}/>],
        ["Turns", <p>{totalTurns}</p> ]
    ];
    
    function formatScores(scores) {
        return scores[0] ? scores.reduce((a, b) => (a + b)) : 0
    };

    function handleStats(stats) {
        return stats.filter(([stat, el]) => el && [stat, el])
            .map(([stat, el]) => <StatRow title={stat} key={stat}>
                {el}
            </StatRow>
        );
    };

    return <div className={styles.endGameModal}>
        <Modal isVisible={isVisible} position="absolute" visibilityHandler={visibilityHandler}>
            <div className={styles.scoreDetails}>
                <SvgOutlinedText text="Results" width="168" height="86" strokeWidth="6" />

                <div className={styles.scoreDetailsInternal}>
                    <div className={styles.scoreDetailsTop}>
                        <StatsSection title="Winner">
                            <h4 className={styles.winnerName}>{scores[0].name}</h4>

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

                        {individualTimersVisible && <StatsSection title="Lowest time">
                            <h4 className={styles.winnerName}>{lowestTime.name}</h4>
                            <SvgTimer id="lowestTime" digits={lowestTime.timer}/>
                        </StatsSection>}
                    </div>
                    
                    <div className={styles.ranking}>
                        {scores && scores.map((player, idx) => <RankRow
                            position={idx + 1}
                            playerName={player.name}
                            score={player.scores}
                            timer={player.timer}
                            key={`results${idx + 1}`}
                        />)}
                    </div>
                </div>
            </div>
        </Modal>
    </div>;
};