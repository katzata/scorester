import { useRef, useEffect, useState } from "react";
import styles from "./InputModal.module.scss";

import useKeyPress from "../../../../hooks/useKeyPress";
import Modal from "../../../shared/Modal/Modal";
import Icons from "../../../shared/Icons/Icons";

export default function InputModal({ isVisible, player, handleScoreInput, visibilityHandler, zIndex }) {
    const [inputValue, setInputValue] = useState("");
    const [pressedKey] = useKeyPress();
    const inputRef = useRef(null);

    const handleConfirm = () => {
        visibilityHandler(false);
        handleScoreInput(Number(inputValue));
        setInputValue("");
    };

    useEffect(() => {
        if (isVisible) {
            if (document.activeElement !== inputRef.current) {
                inputRef.current.focus();
            };
        } else {
            if (document.activeElement === inputRef.current) {
                inputRef.current.blur();
            };
        };

        if (isVisible && pressedKey === "enter") {
            handleScoreInput(Number(inputValue));
            visibilityHandler(false);
        };
    }, [isVisible, pressedKey, handleScoreInput, inputValue, visibilityHandler]);

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
                        enterKeyHint="done"
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <button className={styles.insertScoreButton} onClick={handleConfirm}>
                        <Icons current={"check"}/>
                    </button>
                </div>
            </div>
        </Modal>
    </section>;
};