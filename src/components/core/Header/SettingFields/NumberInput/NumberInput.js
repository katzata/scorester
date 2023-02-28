import { useEffect, useRef, useState } from "react";
import styles from "./NumberInput.module.scss";

/**
 * A number input field component containing a title and the actual number input field.
 * @param {Object} props
 * @param {String} props.title
 * @param {String} props.id
 * @param {String} props.section
 * @param {Number} props.value
 * @param {Number} props.min
 * @param {CallableFunction} props.changeHandler
 * 
 * @props
 * @param {String} props.title Title text for the input field.
 * @param {String} props.id Id for the input field.
 * @param {String} props.section The settings section that the field belongs to (gameSettings/userSettings).
 * @param {Number} props.value The value that will be displayed.
 * @param {Number} props.min (OPTIONAL) The minimum possible value that can be displayed.
 * @param {CallableFunction} props.changeHandler A callback that updates the values.
 */
function NumberInput({ title, id, section, value, min, max, changeHandler, disabled}) {
    const [currentValue, setCurrentValue] = useState(Number(value));
    const inputRef = useRef(null);

    /**
     * Validates the user input.
     * Sets the value at it's minimum (min prop) if the value is below it and if the min prop is provided.
     * @param {Event} e The event object.
     */
    function handleInput(e) {
        const input = parseInt(e.target.value);
        const newValue = input >= min ? input : min;

        if (input >= min && input <= max) {
            changeHandler({
                type: e.target.type,
                id: e.target.id,
                dataset: e.target.dataset,
                value: newValue
            });

            setCurrentValue(input);
        } else {
            if (!isNaN(input) && typeof input !== "string") {
                setCurrentValue(input);
            } else {
                setCurrentValue("");
            };
        };
    };

    /**
     * Check if the value in the field is within range.
     * If the value is not within range it get's reset to the last known good value.
     * @returns The last known good value or null.
     */
    const handleBlur = () => (currentValue !== value ? setCurrentValue(value) : null);

    useEffect(() => {
        setCurrentValue(Number(value));
        inputRef.current.focus();
    }, [value]);

    return <div className={styles.numberInput}>
        <p>{title}</p>

        <input
            ref={inputRef}
            type="number"
            id={id}
            min={""}
            max={max}
            placeholder={min ? min : 0}
            data-section={section}
            value={currentValue || ""}
            onChange={handleInput}
            onBlur={handleBlur}
            disabled={disabled}
            key={id}
        />
    </div>;
};

export default NumberInput;