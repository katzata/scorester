import { useEffect, useState } from "react";
import InputModal from "./InputModal/InputModal";
import styles from "./Main.module.scss";

import ScoreColumn from "./ScoreColumn/ScoreColumn";

export default function Main({ numberOfPlayers, playerNames, playerTurnIndex }) {
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [isEditingInput, setIsEditingInput] = useState(false);

    const handleModalVisibility = (e) => {
        if (!isEditingInput && !inputModalVisible) {
            setInputModalVisible(true);
        };
    };

    useEffect(() => {
        // console.log(isEditingInput);
        // console.log(playerNames);
    }, []);

    return <main className={styles.main} onClick={handleModalVisibility}>
        <InputModal isVisible={inputModalVisible} visibilityHandler={setInputModalVisible} player={"XXXX"} zIndex={numberOfPlayers}/>

        {[...Array(numberOfPlayers).keys()].map((idx) => {
            return <ScoreColumn
                index={idx}
                player={playerNames[idx]}
                playerTurnIndex={playerTurnIndex}
                numberOfPlayers={numberOfPlayers}
                setIsEditingInput={setIsEditingInput}
                key={`col${idx}`}
            /> 
        })}
    </main>;
};