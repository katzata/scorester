// import { useEffect, useState } from "react";
import { changeSetting } from "../../../../../services/userService";
import styles from "./NumberInput.module.scss";

function NumberInput({ title, id, section, value, min, changeHandler, disabled}) {
    /**
     * Validates the user input.
     * Sets the value at it's minimum (min prop) if the provided value prop is below it.
     * @param {Event} e The event object.
     */
    function handleInput(e) {
        const { id, value } = e.target;
        const input = parseInt(value);
        const finalValue = input >= min ? input : min;

        changeSetting(e.target);
        changeHandler(id, finalValue);
    };

    return <div className={styles.numberInput}>
        <p>{title}</p>

        <input
            type="number"
            id={id}
            min={Number(min)}
            placeholder={min ? min : 0}
            data-section={section}
            value={value}
            onChange={handleInput}
        />
    </div>;
};

export default NumberInput;