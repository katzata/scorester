import { useState, useEffect, useRef, useCallback } from "react";

import useClickAndHold from "../../../../../hooks/useClickAndHold";

import Icons from "../../../../shared/Icons/Icons";
import styles from "./InputField.module.scss";

export default function InputField({ type, value, editToggle, setValueHandler }) {
    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [holdTrigger, setIsHolding] = useClickAndHold();

    const inputRef = useRef(null);

    const inputStyles = {
        paddingRight: isEditing ? "44px" : "0",
        userSelect: isEditing ? "auto" : "none"
    };

    const buttonStyles = {
        transitionDuration: `${isEditing ? .4 : .2}s`,
        opacity: isEditing ? "1" : "0",
        zIndex: isEditing ? "0" : "-1"
    };

    const handleConfirm = () => {
        setValueHandler(currentValue);
        setIsEditing(false);
        triggerEdit(false);
    };

    const triggerEdit = useCallback((state) => {
        editToggle(state);
    }, [editToggle]);

    useEffect(() => {
        if (holdTrigger) {
            setIsEditing(true);
            triggerEdit(true);
        };
    }, [holdTrigger, triggerEdit]);

    return <div className={styles.scoreField}
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onTouchStart={() => setIsHolding(true)}
        onTouchEnd={() => {
            inputRef.current.focus();
            inputRef.current.select();
            setIsHolding(false);
        }}
    >
        <input 
            ref={inputRef}
            type={type || "number"}
            style={inputStyles}
            value={currentValue || value || ""}
            onChange={(e) => setCurrentValue(e.target.value)}
            disabled={!isEditing}
        />

        <button className={styles.confirmEditButton} style={buttonStyles} onClick={handleConfirm}>
            <Icons current="check" size="24px"/>
        </button>
    </div>;
};