import { useContext, useState } from "react";
import styles from "./ScoreColumn.module.scss";
import GameContext from "../../../../contexts/GameContext";

import InputField from "./InputField/InputField";

export default function ScoreColumn({
    isEditingInput,
    index,
    player,
    playerScores,
    scoreTotal,
    editPlayerName,
    setIsEditingInput,
    editPlayerScore,
    inputModalVisibilityHandler
    }) {
    const { playerTurnIndex } = useContext(GameContext).gameData;

    const [editingIndex, setEditingIndex] = useState(null);

    const isCurrentlyPlaying = playerTurnIndex === index;
    const columnStyles = {
        backgroundColor: isCurrentlyPlaying ? "#121212" : "transparent",
        userSelect: isCurrentlyPlaying ? "auto" : "none",
        boxShadow: "0 0 2px 0 white"
    };

    /**
     * An edit field (name, score) toggle handler.
     * Sets the isEditingInput toggle @see Main.js
     * @param {Object} data An object that contains two key value pairs.
     * @param {Number} data.idx (Optional) The index of the score (input field) that is being edited.
     * Only a single value is permitted. Used to prevent simultaneous input field edits.
     * @param {Boolean} data.state The state defining wether an input field is beng currently edited.
     * Intended to set isEditingInput.
     */
    const handleEditToggle = ({ idx, state }) => {
        if (editingIndex === null) {
            if (idx) setEditingIndex(idx);
        } else {
            if (!state && idx) setEditingIndex(null);
        };

        setIsEditingInput(state);
    };

    /**
     * Sets a new player name using the editPlayerName callback component prop.
     * Uses the index component prop in order to define which player name is being currently edited.
     * @param {String} name A string representing the new player name.
     */
    const handleNameEditValue = (name) => {
        editPlayerName(index, name);
        setIsEditingInput(false);
    };

    /**
     * Edit an already existing player score field.
     * Sets the isEditingInput toggle @see Main.js
     * @param {Object} data An object containing two key value pairs.
     * @param {Number} data.idx A number that represents the index of the score field that is currently being edited.
     * @param {Number} data.value A number that represents the new score field value.
     */
    const handleScoreEditValue = ({ idx, value }) => {
        const newScores = [...playerScores];
        newScores[idx] = Number(value);

        setIsEditingInput(false);
        editPlayerScore(index, { index: idx, newScore: value });
    };

    return <section className={styles.scoreColumn} style={columnStyles} onClick={() => inputModalVisibilityHandler(true)}>
        <div className={styles.columnInternal}>
            <div className={styles.columnHeader}>
                <InputField
                    type="text"
                    isEditingInput={isEditingInput}
                    value={player}
                    editToggle={(state) => handleEditToggle({ state })}
                    setValueHandler={handleNameEditValue}
                    visibilityHandler={inputModalVisibilityHandler}
                />
            </div>

            <div className={styles.columnBody}>
                {playerScores && playerScores.length > 0 && playerScores.map((el, idx) => <InputField
                    type="number"
                    value={el}
                    editToggle={(state) => handleEditToggle({ idx, state })}
                    isEditingInput={isEditingInput}
                    setValueHandler={(value) => handleScoreEditValue({ idx, value })}
                    visibilityHandler={inputModalVisibilityHandler}
                    key={`scoreField${index}-${idx}`}
                />)}
            </div>

            <div className={styles.columnFooter}>
                <span className={styles.columnTotal}>{scoreTotal > 0 && scoreTotal}</span>
            </div>
        </div>
    </section>;
};