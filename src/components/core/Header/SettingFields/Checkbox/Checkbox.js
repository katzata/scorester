import styles from "./Checkbox.module.scss";
import { changeSetting } from "../../../../../services/userService";

function Checkbox({title, id, section, value, changeHandler, disabled}) {
    const loggedStyles = {
        color: `rgba(255, 255, 255, ${disabled ? ".5" : "1"})`
    };

    function handleChange(e) {
        const { id, checked } = e.target;

        changeSetting(e.target);
        changeHandler(id, checked);
    };

    return <div className={styles.checkbox}>
        <p style={loggedStyles}>{title}</p>

        <input
            type="checkbox"
            id={id}
            data-section={section}
            style={loggedStyles}
            disabled={disabled}
            checked={value}
            onChange={handleChange}
        />
    </div>;
};

export default Checkbox;