import { useRef, useEffect, useState } from "react";
import styles from "./InputModal.module.scss";

import Modal from "../../../shared/Modal/Modal";
import Icons from "../../../shared/Icons/Icons";
import { getStorage } from "../../../../services/storageService";

export default function InputModal({ isVisible, visibilityHandler, player, zIndex }) {
    const userDetails = getStorage("scUserDetails");
    const [inputValue, setInputValue] = useState(0);
    const inputRef = useRef(null);
    
    const modalContainerStyles = {
        transform: `scaleY(${isVisible ? 100 : 0}%)`,
        zIndex
    };

    const handleScoreInput = (e) => {
        const value = Number(e.target.value);

        if (userDetails && userDetails.gameSettings && userDetails.gameSettings.negativeValues) {
            setInputValue(value);
        } else {
            setInputValue(value >= 0 ? value : 0);
        };
        // const scores = [...currentScores, Number(inputValue)];
        // const scoresData = {
        //     player: index,
        //     scores,
        // };
        
        // setCurrentScores(scores);
        // setStorage({ scGameScores: scoresData });
    };

    useEffect(() => {
        if (isVisible) {
            inputRef.current.focus();
            inputRef.current.select();
        };
    }, [isVisible]);

    return <section className={styles.modalContainer} style={modalContainerStyles}>
        <Modal isVisible={isVisible} position="absolute" visibilityHandler={visibilityHandler}>
            <div className={styles.scoreInputContainer}>
                <span className={styles.playerName}>{player}</span>

                {/* <div className={styles.scoreOperatorsContainer}>
                    <button className={styles.scoreOperatorToggle} onClick={() => setScoreOperator(true)} style={{ backgroundColor: `rgba(255, 255, 255, ${scoreOperator ? ".2" : "0"})` }}>
                        <Icons current={"minus"} />
                    </button>

                    <button className={styles.scoreOperatorToggle} onClick={() => setScoreOperator(false)} style={{ backgroundColor: `rgba(255, 255, 255, ${scoreOperator ? "0" : ".2"})` }}>
                        <Icons current={"plus"} />
                    </button>
                </div> */}

                <div className={styles.insertScoreContainer}>
                    <input
                        ref={inputRef}
                        className={styles.scoreInput}
                        type="number" value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <button className={styles.insertScoreButton} onClick={handleScoreInput}>
                        <Icons current={"check"}/>
                    </button>
                </div>
            </div>
        </Modal>
    </section>;
};