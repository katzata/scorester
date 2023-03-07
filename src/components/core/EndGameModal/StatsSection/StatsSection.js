import styles from "./StatsSection.module.scss";

/**
 * Render a stats section.
 * @param {Object} props
 * @param {String} props.title
 * @param {JSX} props.children
 *
 * @component
 * @props title - The section title
 * @props children - The default react children object.
 * @returns JSX component.
 */
export default function StatsSection({ title, children }) {
    return <div className={styles.statsSection}>
        <h3>{title}</h3>
        {children}
    </div>
};