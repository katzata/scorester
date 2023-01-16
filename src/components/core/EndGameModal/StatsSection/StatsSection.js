import styles from "./StatsSection.module.scss";

export default function StatsSection({ title, children }) {
    return <div className={styles.statsSection}>
        <h3>{title}</h3>
        {children}
    </div>
};