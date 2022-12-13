import { useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";
import { changeSetting } from "../../../../../services/userService";

function Checkbox({title, id, section, value = false, disabled}) {
    const [checked, setChecked] = useState(value);

    const loggedStyles = {
        color: `rgba(255, 255, 255, ${disabled ? ".5" : "1"})`
    };

    function handleChange(e) {
        setChecked(!checked);
        changeSetting(e);
    };

    useEffect(() => {
        if (value !== checked) {
            setChecked(value);
        };
    }, [value]);

    return <div className={styles.checkbox}>
        <p style={loggedStyles}>{title}</p>

        <input
            type="checkbox"
            id={id}
            data-section={section}
            style={loggedStyles}
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
        />
    </div>;
};

export default Checkbox;