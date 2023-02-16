import { useContext, useEffect, useState } from "react";
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
export default function Main() {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const { numberOfPlayers } = userContext.userData.gameSettings;
    const { isPlaying, scores, playerTurnIndex } = gameContext.gameData;

    const [pressedKey] = useKeyPress();
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
	 * Edit a player name field.
	 * Sets the state hook (playerNames) and saves to local storage.
	 * @param {Number} index The index indicating which player name to edit.
	 * @param {String} newName The new name value.
	 */
	const handlePlayerNameEdit = (index, newName) => {
		const localData = getStorage("scGameDetails");
		const newPlayerNames = [...scores.map(el => el.name)];

		localData["scores"][index].name = newName
		newPlayerNames[index] = newName;

        saveToStorage("scGameDetails", localData);
        gameContext.dispatch({ type: "player_name", payload: [index, newName] });
	};

    useEffect(() => {
        if (inputModalVisible && pressedKey === "cancel") {
            setInputModalVisible(false);
        };
    }, [pressedKey, inputModalVisible]);
    
    return <main className={styles.main}>
        <MessageModal/>

        <InputModal
            isVisible={inputModalVisible}
            visibilityHandler={handleModalVisibility}
            player={scores[playerTurnIndex].name}
            zIndex={numberOfPlayers}
            playerTurnIndex={playerTurnIndex}
        />

        <section id="scoreColumnsContainer" className={styles.scoreColumnsContainer}>
            {scores && scores.map((data, idx) => {
                return <ScoreColumn
                    index={idx}
                    player={data.name}
                    playerScores={data.scores}
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