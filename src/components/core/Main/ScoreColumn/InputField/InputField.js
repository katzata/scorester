import { useState, useEffect, useRef, useCallback, useContext } from "react";
import styles from "./InputField.module.scss";

import UserContext from "../../../../../contexts/UserContext";
import GameContext from "../../../../../contexts/GameContext";
import useClickAndHold from "../../../../../hooks/useClickAndHold";
import useKeyPress from "../../../../../hooks/useKeyPress";
import Icons from "../../../../shared/Icons/Icons";

export default function InputField({ type, value, isEditingInput, editToggle, setValueHandler }) {
    const { isPlaying } = useContext(GameContext).gameData;
    const { editableFields } = useContext(UserContext).userData.gameSettings;

    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [holdTrigger, setIsHolding] = useClickAndHold();
    const [pressedKey] = useKeyPress();

    const inputRef = useRef(null);

    const inputStyles = {
        width: isEditing ? "calc(100% - 44px)" : "100%",
        // marginLeft: isEditing ? "auto" : "0",
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
            if (type === "number" || type === "text") setIsHolding(holdState);
        } else {
            if (type === "text") setIsHolding(holdState);
        };

        if (!holdState && isEditing) {
            inputRef.current.select();
            inputRef.current.focus();
        };
    };

    /**
     * Reset all the active toggles.
     */
    const resetToggles = useCallback(() => {
        setIsEditing(false);
        editToggle(false);

        window.getSelection().removeAllRanges();
        inputRef.current.blur();
    }, [editToggle]);

    /**
     * Trigger the edit state.
     */
    const triggerEdit = useCallback(editToggle, [editToggle]);

    /**
     * Confirm the edited value.
     */
    const handleConfirm = useCallback(() => {
        if (currentValue === "") {
            setCurrentValue(value)
        };

        setValueHandler(currentValue !== "" ? currentValue : value);
        resetToggles();
    }, [currentValue, resetToggles, setValueHandler, value]);

    useEffect(() => {
        if (holdTrigger && !isEditing && !isEditingInput) {
            setIsEditing(true);
            triggerEdit(true);
        };

        if (isEditing && pressedKey === "cancel") {
            setCurrentValue(value);
            resetToggles();
        };

        if (isEditing && pressedKey === "enter") {
            handleConfirm();
        };
    }, [isEditing, holdTrigger, triggerEdit, pressedKey, handleConfirm, resetToggles, value, isEditingInput]);

    return <div className={styles.scoreField}>
        <input
            ref={inputRef}
            type={type}
            style={inputStyles}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            enterKeyHint="done"
            readOnly={!isEditing}
        />

        <button className={styles.confirmEditButton} style={buttonStyles} onClick={handleConfirm}>
            <Icons current="check" size="24px"/>
        </button>

        <button
            className={styles.editToggle}
            style={{ zIndex: isEditing ? "-1" : "0" }}
            onMouseDown={() => handleHold(true)}
            onTouchStart={() => handleHold(true)}
            onMouseUp={() => handleHold(false)}
            onTouchEnd={() => handleHold(false)}
        />
    </div>;
};