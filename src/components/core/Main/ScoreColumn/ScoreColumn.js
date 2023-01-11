import { useEffect, useState } from "react";
import styles from "./ScoreColumn.module.scss";
// import { getStorage, setStorage } from "../../../../services/storageService";

import InputField from "./InputField/InputField";

export default function ScoreColumn({
    isPlaying,
    index,
    player,
    playerScores,
    setPlayerName,
    numberOfPlayers,
    playerTurnIndex,
    setIsEditingInput,
    inputModalVisibilityHandler
    }) {
    const [currentScores, setCurrentScores] = useState(playerScores);
    const [editingIndex, setEditingIndex] = useState(null);
        
    const isCurrentlyPlaying = playerTurnIndex === index;
    const columnStyles = {
        width: `${100 / (numberOfPlayers || 1)}%`,
        backgroundColor: isCurrentlyPlaying ? "#121212" : "transparent",
        userSelect: isCurrentlyPlaying ? "auto" : "none"
    };

    /**
     * An edit field (name, score) toggle handler.
     * Sets the isEditingInput toggle @see Main.js
     * @param {Object} data An object that contains two key value pairs.
     * @param {Number} data.idx (Optional) The index of the score (input field) that is being edited.
     * Only a single value is permited. Used to prevent simultaneous input field edits.
     * @param {Boolean} data.state The state defining wether an input field is beng currently edited.
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

    /**
     * Sets a new player name using the setPlayerName callback component prop.
     * Uses the index component prop in order to define which player name is being currently edited.
     * @param {String} name A string representing the new player name.
     */
    const handleNameEditValue = (name) => {
        setPlayerName(index, name);
    };

    /**
     * Edit an already existing player score field.
     * Sets the isEditingInput toggle @see Main.js
     * @param {Object} data An object containing two key value pairs.
     * @param {Number} data.idx A number that represents the index of the score field that is currently being edited.
     * @param {Number} data.value A number that represents the new score field value.
     */
    const handleScoreEditValue = ({ idx, value }) => {
        const newScores = [...currentScores];
        newScores[idx] = Number(value);

        setCurrentScores(newScores);
        setIsEditingInput(false);
    };

    useEffect(() => {

    }, []);

    return <section className={styles.scoreColumn} style={columnStyles} onClick={() => inputModalVisibilityHandler(true)}>
        <div className={styles.columnInternal}>
            <div id="columnHeader" className={styles.columnHeader}>
                <InputField
                    isPlaying={isPlaying}
                    type="text"
                    value={player}
                    editToggle={(state) => handleEditToggle({ state })}
                    setValueHandler={handleNameEditValue}
                />
            </div>
            
            <div id="columnBody" className={styles.columnBody}>
                {playerScores && playerScores.length > 0 && playerScores.map((el, idx) => <InputField
                    type="number"
                    value={el}
                    editToggle={(state) => handleEditToggle({ idx, state })}
                    setValueHandler={(value) => handleScoreEditValue({ idx, value })}
                    key={`scoreField${index}-${idx}`}
                />)}
            </div>

            <div id="columnFooter" className={styles.columnFooter}>
                <span className={styles.columnTotal}>{playerScores && playerScores[0] !== undefined && playerScores.reduce((a, b) => Number(a) + Number(b))}</span>
            </div>
        </div>
    </section>;
};