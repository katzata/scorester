import { useState, useEffect, useRef, useCallback, useContext } from "react";
import styles from "./InputField.module.scss";

import UserContext from "../../../../../contexts/UserContext";
import GameContext from "../../../../../contexts/GameContext";
import useClickAndHold from "../../../../../hooks/useClickAndHold";
import useKeyPress from "../../../../../hooks/useKeyPress";
import Icons from "../../../../shared/Icons/Icons";

export default function InputField({ type, value, editToggle, setValueHandler }) {
    const { isPlaying } = useContext(GameContext).gameData;
    const { editableFields } = useContext(UserContext).userData.gameSettings;

    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [holdTrigger, setIsHolding] = useClickAndHold();
    const [ pressedKey ] = useKeyPress();

    const inputRef = useRef(null);

    const inputStyles = {
        width: isEditing ? "calc(96% - 44px)" : "96%",
        userSelect: isEditing ? "auto" : "none"
    };

    const buttonStyles = {
        transitionDuration: `${isEditing ? .4 : .2}s`,
        opacity: isEditing ? "1" : "0",
        zIndex: isEditing ? "0" : "-1"
    };

    /**
     * Receive a hold state and select the input field.
     * @param {Boolean} holdState The current hold state.
     */

    const handleHold = (holdState) => {
        if (isPlaying && editableFields) {
            if ((editableFields && type === "number") || type === "text") {
                setIsHolding(holdState);
            };
        } else {
            if (type === "text") setIsHolding(holdState);
        };

        if (!holdState && isEditing && currentValue === value) {
            inputRef.current.select();
            inputRef.current.focus();
        };
    };

    /**
     * Confirm the edited value.
     */
    const handleConfirm = () => {
        setValueHandler(currentValue);
        resetToggles();
    };

    /**
     * Reset all the active toggles.
     */
    const resetToggles = () => {
        setIsEditing(false);
        editToggle(false);

        window.getSelection().removeAllRanges();
    };

    /**
     * Trigger the edit state.
     */
    const triggerEdit = useCallback((state) => {
        editToggle(state);
    }, [editToggle]);

    useEffect(() => {
        if (holdTrigger) {
            setIsEditing(true);
            triggerEdit(true);

            inputRef.current.select();
            inputRef.current.focus();
        };

        if (isEditing && pressedKey === "cancel") {
            resetToggles();
        };

        if (isEditing && pressedKey === "enter") {
            handleConfirm();
        };
    }, [isEditing, holdTrigger, triggerEdit, pressedKey]);

    return <div className={styles.scoreField}
        onMouseDown={() => handleHold(true)}
        onMouseUp={() => handleHold(false)}
        onTouchStart={() => handleHold(true)}
        onTouchEnd={() => handleHold(false)}
    >
        <input
            ref={inputRef}
            type={type}
            style={inputStyles}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            disabled={!isEditing}
            onMouseDown={() => handleHold(true)}
            onMouseUp={() => handleHold(false)}
            onTouchStart={() => handleHold(true)}
            onTouchEnd={() => handleHold(false)}
        />

        <button className={styles.confirmEditButton} style={buttonStyles} onClick={handleConfirm}>
            <Icons current="check" size="24px"/>
        </button>
    </div>;
};