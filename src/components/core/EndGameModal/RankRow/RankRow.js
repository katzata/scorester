import styles from "./RankRow.module.scss";
import SvgTimer from "../../../shared/SvgTimer/SvgTimer"

/**
 * A component that renders player data
 * @param {Object} props 
 * @param {Array.<number>} props.timer
 * 
 * @component
 * @param props 
 * @param {Array.<number>} props.timer A timer array consisting of 3 items (h,m,s).
 */
export default function RankRow({ position, playerName, score, timer }) {
    return <p className={styles.rankingRow}>
        <span className={styles.positionColumn}>{position}.</span>
        <span className={styles.nameColumn}>{playerName}</span>

        <span className={styles.pointsColumn}>
            {score}
            <span> pts.</span>
        </span>

        {timer && <SvgTimer id={`individual-res${position}`} digits={timer}/>}
    </p>;
};