import styles from "./RankRow.module.scss";
import SvgTimer from "../../../shared/SvgTimer/SvgTimer"

/**
 * A component that renders player data
 * @param {Object} props 
 * @param {Number} props.position
 * @param {String} props.playerName
 * @param {Number} props.score
 * @param {Number} props.timer
 * 
 * @component
 * @props position - The list index.
 * @props playerName - The player name.
 * @props score - The score total.
 * @props timer - Time in seconds.
 */
export default function RankRow({ position, playerName, score, timer }) {
    return <p className={styles.rankingRow}>
        <span className={styles.positionColumn}>{position}.</span>
        <span className={styles.nameColumn}>{playerName}</span>

        <span className={styles.pointsColumn}>
            {score}
            <span> pts.</span>
        </span>
        
        {timer !== undefined && <SvgTimer id={`individual-res${position}`} digits={timer}/>}
    </p>;
};