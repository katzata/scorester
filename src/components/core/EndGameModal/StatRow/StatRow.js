import styles from "./StatRow.module.scss";

/**
 * Component rendering a stat row.
 * Stat title and child elements.
 * @param props
 * @param {String} props.title The stat title.
 * @param {Object} props.children The default Rect children object.
 */
export default function StatRow({ title, children }) {
    return <div className={styles.statRow}>
        <h5>{title} :</h5>
        {children}
    </div>;
};