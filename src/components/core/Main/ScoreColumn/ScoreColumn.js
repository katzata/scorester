import { useEffect, useState } from "react";
import { setStorage } from "../../../../services/storageService";
import styles from "./ScoreColumn.module.scss";

import InputField from "./InputField/InputField";

export default function ScoreColumn({ index, player, numberOfPlayers, playerTurnIndex, setIsEditingInput }) {
    const isCurrentlyPlaying = playerTurnIndex === index;
    const [currentPlayer, setCurrentPlayer] = useState(player);
    const [currentScores, setCurrentScores] = useState([1, 2, 3]);
    const [editingIndex, setEditingIndex] = useState(null);

    const columnStyles = {
        width: `${100 / (numberOfPlayers || 1)}%`,
        backgroundColor: isCurrentlyPlaying ? "#121212" : "transparent",
        userSelect: isCurrentlyPlaying ? "auto" : "none"
    };

    /**
     * An edit field (name, score) toggle handler.
     * Sets the isEditingInput @see Main.js
     * @param {Object} data An object that contains two key value pairs.
     * @property {Number} data.idx (Optional) The index of the score (input field) that is being edited.
     * Only a single value is permited. Used to prevent simultaneous input field edits.
     * @property {Boolean} data.state The state defining wether an input field is beng currently edited.
     * Intended to set isEditingInput.
     */
    const handleEditToggle = ({ idx, state }) => {
        if (editingIndex === null) {
            if (idx) {
                setEditingIndex(idx);
            };

            setIsEditingInput(true);
        } else {
            if (!state) {
                if (idx) {
                    setEditingIndex(null);
                };

                setIsEditingInput(false);
            };
        };
    };

    const handleNameEditValue = (value) => {

        setCurrentPlayer(value);
    };

    const handleScoreEditValue = ({ idx, value }) => {
        const newScores = [...currentScores];
        newScores[idx] = Number(value);
        // console.log(newScores);
        setCurrentScores(newScores);
        // setIsEditingInput(false);
    };

    useEffect(() => {
        // setCurrentPlayer(player);
    }, []);

    return <section className={styles.scoreColumn} style={columnStyles}>
        <div className={styles.columnInternal}>
            <div id="columnHeader" className={styles.columnHeader}>
                <InputField
                    type="text"
                    value={player}
                    editToggle={(state) => handleEditToggle({ state })}
                    setValueHandler={handleNameEditValue}
                />
            </div>
            
            <div id="columnBody" className={styles.columnBody}>
                {currentScores && currentScores.map((el, idx) => <InputField
                    type="number"
                    value={el}
                    editToggle={(state) => handleEditToggle({ idx, state })}
                    setValueHandler={(value) => handleScoreEditValue({ idx, value })}
                    key={`scoreField${index}-${idx}`}
                />)}
            </div>

            <div id="columnFooter" className={styles.columnFooter}>
                <span className={styles.columnTotal}>{currentScores[0] && currentScores.reduce((a, b) => a + b)}</span>
            </div>
        </div>
    </section>;
};