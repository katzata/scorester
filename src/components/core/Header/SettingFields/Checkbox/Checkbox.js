import styles from "./Checkbox.module.scss";

/**
 * A checkbox field component containing a title and the actual checkbox field.
 * @param {Object} props
 * @param {String} props.title
 * @param {String} props.id
 * @param {String} props.section
 * @param {Number} props.value
 * @param {Number} props.min
 * @param {CallableFunction} props.changeHandler
 * @param {Boolean} props.disabled
 * 
 * @props
 * @param {String} props.title Title text for the input field.
 * @param {String} props.id Id for the input field.
 * @param {String} props.section The settings section that the field belongs to (gameSettings/userSettings).
 * @param {Boolean} props.value The value that will be displayed.
 * @param {Number} props.min (OPTIONAL) The minimum possible value that can be displayed.
 * @param {CallableFunction} props.changeHandler A callback that updates the values.
 * @param {Boolean} props.disabled Indicates wether the field is disabled or not.
 */
function Checkbox({ title, id, section, value, changeHandler, disabled }) {
    const loggedStyles = {
        color: `rgba(255, 255, 255, ${disabled ? ".5" : "1"})`
    };

    return <div className={styles.checkbox}>
        <p style={loggedStyles}>{title}</p>

        <input
            type="checkbox"
            id={id}
            data-section={section}
            style={loggedStyles}
            checked={value || false}
            onChange={(e) => changeHandler(e.target)}
            disabled={disabled}
        />
    </div>;
};

export default Checkbox;