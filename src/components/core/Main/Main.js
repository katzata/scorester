import { useCallback, useEffect, useState } from "react";
import styles from "./Main.module.scss";

import { getStorage, saveToStorage } from "../../../services/storageService";

import InputModal from "./InputModal/InputModal";
import ScoreColumn from "./ScoreColumn/ScoreColumn";

/**
 * Component containing the player score columns.
 * One of the three main components besides the Header and Footer.
 * 
 * @param {Object} props
 * @param {Boolean} props.isPlaying
 * @param {Number} props.numberOfPlayers
 * @param {Array.<String>} props.playerNames
 * @param {Function} props.setPlayerName
 * @param {Number} props.playerTurnIndex
 * @param {Function} props.playerTurnIndexHandler
 * 
 * @component
 * @param {Boolean} props.isPlaying The current playing state.
 * @param {Number} props.numberOfPlayers The total number of current players.
 * @param {Array.<String>} props.playerNames An array containing the current player names.
 * @param {Function} props.setPlayerName A callback function that handles player name editing.
 * @param {Number} props.playerTurnIndex A number indicating whose turn is it.
 * @param {Function} props.playerTurnIndexHandler A callback that handles the player turn index change.
 */
export default function Main({ isPlaying, numberOfPlayers, playerNames, setPlayerName, playerTurnIndex, playerTurnIndexHandler }) {
    const initialDetails = getStorage("scGameDetails") || {};
    const [playerScores, setPlayerScores] = useState((initialDetails.scores && initialDetails.scores.map(el => el.scores)) || [...Array(numberOfPlayers).fill([])]);
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [isEditingInput, setIsEditingInput] = useState(false);

    /**
     * Toggles the modal visibility accourding to the passed state parameter.
     * @param {Boolean} state The expected modal visibility state.
     */
    const handleModalVisibility = (state) => {
        if (isPlaying && !isEditingInput) {
            setInputModalVisible(state);
        };
    };

    /**
     * Add a new score to the current player score column.
     * @param {Number} score A new player score.
     */
    const addPlayerScores = (score) => {
        const gameScores = getStorage("scGameDetails").scores;
        gameScores[playerTurnIndex].scores.push(score);

        saveToStorage("scGameDetails", { scores: gameScores });
        setPlayerScores(gameScores.map(el => el.scores));
        handleModalVisibility(false);
        playerTurnIndexHandler();
    };

    const handleScores = useCallback(() => {
        if (!isPlaying) {
            setPlayerScores([...Array(numberOfPlayers).fill([])]);
        };
    }, [isPlaying]);

    useEffect(() => {
        handleScores();
    }, [isPlaying, handleScores]);

    return <main className={styles.main}>
        <InputModal
            isVisible={inputModalVisible}
            visibilityHandler={handleModalVisibility}
            player={playerNames[playerTurnIndex]}
            addPlayerScores={addPlayerScores}
            zIndex={numberOfPlayers}
            playerTurnIndex={playerTurnIndex}
        />

        <section className={styles.scoreColumnsContainer}>
            {[...Array(numberOfPlayers).keys()].map((idx) => {
                return <ScoreColumn
                    isPlaying={isPlaying}
                    index={idx}
                    player={playerNames[idx] || `Player ${idx + 1}`}
                    playerTurnIndex={playerTurnIndex}
                    playerScores={playerScores[idx]}
                    addPlayerScores={(score) => addPlayerScores(idx, score)}
                    numberOfPlayers={numberOfPlayers}
                    setPlayerName={setPlayerName}
                    setIsEditingInput={setIsEditingInput}
                    inputModalVisibilityHandler={() => handleModalVisibility(true)}
                    key={`col${idx}`}
                />
            })}
        </section>
    </main>;
};