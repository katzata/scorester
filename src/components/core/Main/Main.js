import { useEffect, useState } from "react";
import styles from "./Main.module.scss";

import { getStorage } from "../../../services/storageService";

import InputModal from "./InputModal/InputModal";
import ScoreColumn from "./ScoreColumn/ScoreColumn";

/**
 * Component containing the player score columns.
 * One of the three main components besides the Header and Footer.
 * @param {Object} props
 * @param {Number} props.numberOfPlayers The total number of current players.
 * @param {Array.<String>} props.playerNames An array containing the current player names.
 * @param {Function} props.setPlayerName A callback function that handles player name editing.
 * @param {Number} props.playerTurnIndex A number indicating whose turn is it.
 * 
 * @component
 */
export default function Main({ isPlaying, numberOfPlayers, playerNames, setPlayerName, playerTurnIndex, playerTurnIndexHandler }) {
    const gameDetails = getStorage("scGameDetails");
    const scores = () => gameDetails && gameDetails.scores ? gameDetails.scores.map(player => player.scores) : [];
    const [playerScores, setPlayerScores] = useState(scores());
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

    const addPlayerScores = (score) => {
        const newScores = [...playerScores];
        newScores[playerTurnIndex].push(score);

        setPlayerScores(newScores);
        handleModalVisibility(false);
        playerTurnIndexHandler();
    };

    useEffect(() => {
        // console.log(isEditingInput);
        // console.log(isEditingInput);
        // console.log(playerNames);
    }, []);

    return <main className={styles.main}>
        <InputModal
            isVisible={inputModalVisible}
            visibilityHandler={handleModalVisibility}
            player={playerNames[playerTurnIndex]}
            addPlayerScores={addPlayerScores}
            zIndex={numberOfPlayers}
            playerTurnIndex={playerTurnIndex}
            playerTurnIndexHandler={playerTurnIndexHandler}
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


/*
 * @example
 * const numberOfPlayers = 1 || 2 || 3...
 * const playerNames = ["Player 1", "Player 2", "Player 3"...]
 * const setPlayerName = () => {}
 * const playerTurnIndex = 1 || 2 || 3...
 * 
 * return (
 *   <Main
 *      numberOfPlayers={numberOfPlayers}
 *      playerNames={playerNames}
 *      setPlayerName={setPlayerName}
 *      playerTurnIndex={playerTurnIndex}
 *    />
 * )
*/