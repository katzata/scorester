import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Main.module.scss";

import UserContext from "../../../contexts/UserContext";
import GameContext from "../../../contexts/GameContext";

import { getStorage, saveToStorage } from "../../../utils/localStorage";
import useKeyPress from "../../../hooks/useKeyPress";

import InputModal from "./InputModal/InputModal";
import ScoreColumn from "./ScoreColumn/ScoreColumn";

import MessageModal from "../MessageModal/MessageModal";

/**
 * Component containing the player score columns.
 * One of the four main components besides the Header, Footer and the EndGameModal.
 */
export default function Main({ setEndgameModalVisible }) {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { numberOfPlayers, scoreTarget } = userContext.userData.gameSettings;
    const { isPlaying, scores, playerTurnIndex } = gameContext.gameData;
    const { dispatch } = gameContext;

    const [pressedKey] = useKeyPress();
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [isEditingInput, setIsEditingInput] = useState(false);

    /**
     * Toggles the modal visibility according to the passed state parameter.
     * @param {Boolean} state The expected modal visibility state.
     */
    const handleModalVisibility = useCallback((state) => {
        if (isPlaying && !isEditingInput) {
            setInputModalVisible(state);

            // if (!state) handleScoreTarget(playerTurnIndex);
        };
    }, [isEditingInput, isPlaying]);

    /**
     * Gets the game data from the local storage, updates the player score arrays and saves the new data to the local storage.
     * Toggles the modal visibility state to false thus closing the input modal.
     * Calls the playerTurnIndexHandler in order to change the playerTurnIndex.
     */
    const handleScoreInput = useCallback((inputValue) => {
        console.log(inputValue);
        const score = inputValue === "" ? 0 : inputValue;
        const total = scores[playerTurnIndex].scoreTotal + inputValue;

        dispatch({ type: "score", payload: { score, target: false } });
        handleModalVisibility(false);

        if (scoreTarget > 0 && total >= scoreTarget) {
            setEndgameModalVisible(true);
            dispatch({ type: "pause_game" });
        };
    }, [scores, playerTurnIndex, dispatch, handleModalVisibility, scoreTarget, setEndgameModalVisible]);

    /**
	 * Edit a player name field.
	 * Sets the state hook (playerNames) and saves to local storage.
	 * @param {Number} index The index indicating which player name to edit.
	 * @param {String} newName The new name value.
	 */
	const handlePlayerNameEdit = (index, newName) => {
		const localData = getStorage("scGameDetails");
		const newPlayerNames = [...scores.map(el => el.name)];

		localData["scores"][index].name = newName;
		newPlayerNames[index] = newName;

        saveToStorage("scGameDetails", localData);
        gameContext.dispatch({ type: "player_name", payload: [index, newName] });
	};

    /**
     * Check wether the option is enabled, and if the score target has been reached.
     */
    // const handleScoreTarget = useCallback((turnIndex) => {
    //     if (scoreTarget > 0 && scores[turnIndex].scoreTotal >= scoreTarget) {
    //         gameContext.dispatch({ type: "pause_game" });
    //         setEndgameModalVisible(true);
    //     };
    // }, [scoreTarget, gameContext, scores, setEndgameModalVisible]);

    useEffect(() => {
        if (inputModalVisible && pressedKey === "cancel") {
            setInputModalVisible(false);
        };
    }, [pressedKey, inputModalVisible, scores]);
    
    return <main className={styles.main}>
        <MessageModal/>

        <InputModal
            isVisible={inputModalVisible}
            player={scores[playerTurnIndex].name}
            handleScoreInput={handleScoreInput}
            scoreTarget={scoreTarget}
            visibilityHandler={handleModalVisibility}
            zIndex={numberOfPlayers}
        />

        <section id="scoreColumnsContainer" className={styles.scoreColumnsContainer}>
            {scores && scores.map((playerData, idx) => {
                return <ScoreColumn
                    index={idx}
                    player={playerData.name}
                    playerScores={playerData.scores}
                    scoreTotal={playerData.scoreTotal}
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