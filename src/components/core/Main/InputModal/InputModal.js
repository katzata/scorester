import { useRef, useEffect, useState, useContext } from "react";
import styles from "./InputModal.module.scss";

import GameContext from "../../../../contexts/GameContext";

import Modal from "../../../shared/Modal/Modal";
import Icons from "../../../shared/Icons/Icons";

export default function InputModal({ isVisible, visibilityHandler, player, zIndex }) {
    const gameContext = useContext(GameContext);

    const [inputValue, setInputValue] = useState(0);
    const inputRef = useRef(null);
    
    /**
     * Gets the game data from the local storage, updates the player score arrays and saves the new data to the local storage.
     * Toggles the modal visibility state to false thus closing the input modal.
     * Calls the playerTurnIndexHandler in order to change the playerTurnIndex.
     */
    const handleScoreInput = () => {
        gameContext.dispatch({ type: "score", payload: inputValue });
        visibilityHandler(false);
    };

    useEffect(() => {
        if (isVisible) {
            inputRef.current.focus();
            inputRef.current.select();
        };
    }, [isVisible]);

    return <section id="inputModal" className={styles.modalContainer} style={{ transform: `scaleY(${isVisible ? 100 : 0}%)`, zIndex }}>
        <Modal isVisible={isVisible} position="absolute" visibilityHandler={visibilityHandler}>
            <div className={styles.scoreInputContainer}>
                <span className={styles.playerName}>{player}</span>

                <div className={styles.insertScoreContainer}>
                    <input
                        ref={inputRef}
                        className={styles.scoreInput}
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                    />

                    <button className={styles.insertScoreButton} onClick={handleScoreInput}>
                        <Icons current={"check"}/>
                    </button>
                </div>
            </div>
        </Modal>
    </section>;
};