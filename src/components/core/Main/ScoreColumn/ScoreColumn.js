import styles from "./ScoreColumn.module.scss";

export default function ScoreColumn({ widthDivider }) {
    const width = `${100 / (widthDivider || 1)}%`;

    return <div className={styles.scoreColumn} style={{ width }}>
        
    </div>;
};