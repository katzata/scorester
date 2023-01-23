import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Main.module.scss";

import UserContext from "../../../contexts/UserContext";
import GameContext from "../../../contexts/GameContext";

import { getStorage, saveToStorage } from "../../../services/storageService";

import InputModal from "./InputModal/InputModal";
import ScoreColumn from "./ScoreColumn/ScoreColumn";

const initialGameData = getStorage("scGameDetails") || {};

/**
 * Component containing the player score columns.
 * One of the four main components besides the Header, Footer and the EndGameModal.
 */
export default function Main() {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { numberOfPlayers } = userContext.userData.gameSettings;
    const { isPlaying, scores, playerTurnIndex } = gameContext.gameData;

    const [playerNames, setPlayerNames] = useState(scores.map(el => el.name));
    const [playerScores, setPlayerScores] = useState(scores.map(el => el.scores));
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
    };

    const handleScores = useCallback(() => {
        if (!isPlaying) {
            setPlayerScores([...Array(numberOfPlayers).fill([])]);
        };
    }, [isPlaying, numberOfPlayers]);

    /**
	 * Edit a player name field.
	 * Sets the state hook (playerNames) and saves to local storage.
	 * @param {Number} index The index indicating which player name to edit.
	 * @param {String} newName The new name value.
	 */
	const handlePlayerNameEdit = (index, newName) => {
		const localData = getStorage("scGameDetails");
		const newPlayerNames = [...playerNames];

		localData["scores"][index].name = newName
		newPlayerNames[index] = newName;

		setPlayerNames(newPlayerNames);
        saveToStorage("scGameDetails", localData);
	};

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
                    setPlayerName={handlePlayerNameEdit}
                    setIsEditingInput={setIsEditingInput}
                    inputModalVisibilityHandler={() => handleModalVisibility(true)}
                    key={`col${idx}`}
                />
            })}
        </section>
    </main>;
};