import { useEffect, useState } from "react";
import styles from "./NumberInput.module.scss";

function NumberInput({ title, id, section, value, min, disabled, stylesProp, callback }) {
    const [input, setInput] = useState(value !== 0 ? value : "");

    /**
     * Validates the user input.
     * @param {Event} e The event object.
     */
    function handleInput(e) {
        const value = parseInt(e.target.value);
        const minimum = Number(min);
        const valueCheck = !isNaN(value) && value >= minimum;

        setInput(valueCheck ? value : minimum);
    };

    useEffect(() => {
        // console.log("x");
    }, [input]);

    return <div className={styles.numberInput}>
        <p style={stylesProp}>{title}</p>

        <input
            type="number"
            id={id}
            min={Number(min)}
            placeholder={min ? min : 0}
            data-section={section}
            style={stylesProp}
            value={input}
            onChange={handleInput}
        />
    </div>;
};

export default NumberInput;