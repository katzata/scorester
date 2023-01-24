import { useState, useEffect, useRef, useCallback, useContext } from "react";

// import UserContext from "../../../../../contexts/UserContext";
import GameContext from "../../../../../contexts/GameContext";

import useClickAndHold from "../../../../../hooks/useClickAndHold";

import Icons from "../../../../shared/Icons/Icons";
import styles from "./InputField.module.scss";

export default function InputField({ type, value, editToggle, setValueHandler }) {
    // const userContext = useContext(UserContext).userData;
    const { isPlaying } = useContext(GameContext).gameData;

    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [holdTrigger, setIsHolding] = useClickAndHold();

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

    const handleHold = (holdState) => {
        if (isPlaying) {
            setIsHolding(holdState);

            if (!holdState && isEditing && currentValue === value) {
                inputRef.current.select();
                inputRef.current.focus();
            };
        };
    };

    const handleConfirm = () => {
        setValueHandler(currentValue);
        setIsEditing(false);
        editToggle(false);

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