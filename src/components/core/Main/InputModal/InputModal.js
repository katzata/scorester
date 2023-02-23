import { useRef, useEffect, useState } from "react";
import styles from "./InputModal.module.scss";

import useKeyPress from "../../../../hooks/useKeyPress";
import Modal from "../../../shared/Modal/Modal";
import Icons from "../../../shared/Icons/Icons";

export default function InputModal({ isVisible, player, handleScoreInput, visibilityHandler, zIndex }) {
    const [pressedKey] = useKeyPress();
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const handleConfirm = () => {
        inputRef.current.blur();

        handleScoreInput(inputValue);
        setInputValue("");
    };

    useEffect(() => {
        if (isVisible && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        };

        if (isVisible && pressedKey === "enter") {
            handleScoreInput(inputValue);
        };
    }, [isVisible, pressedKey, inputValue, handleScoreInput]);

    return <section id="inputModal" className={styles.modalContainer} style={{ transform: `scaleY(${isVisible ? 100 : 0}%)`, zIndex }}>
        <Modal isVisible={isVisible} position="absolute" visibilityHandler={visibilityHandler}>
            <div className={styles.scoreInputContainer}>
                <p className={styles.playerName}>
                    {player}
                    <span>'s turn</span>
                </p>

                <div className={styles.insertScoreContainer}>
                    <input
                        ref={inputRef}
                        className={styles.scoreInput}
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                        enterKeyHint="go"
                    />

                    <button className={styles.insertScoreButton} onClick={handleConfirm}>
                        <Icons current={"check"}/>
                    </button>
                </div>
            </div>
        </Modal>
    </section>;
};