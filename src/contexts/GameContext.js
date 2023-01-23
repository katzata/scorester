import { createContext, useState } from "react";
import { getStorage, saveToStorage } from "../services/storageService";
import { compareObjectData } from "../utils/utils";

const GameContext = createContext();

export function GameProvider({ children, numberOfPlayers }) {
    const newArray = Array(numberOfPlayers);
    const storageData = getStorage("scGameDetails") || {};
    const { isPlaying, gamePaused, playerTurnIndex, mainTimer, individualTimers, scores } = storageData;

    const defaultData = {
        isPlaying: isPlaying !== undefined ? isPlaying : false,
        gamePaused: gamePaused !== undefined ? gamePaused : false,
        playerTurnIndex: playerTurnIndex !== undefined ? playerTurnIndex : 0,
        mainTimer: mainTimer !== undefined ? mainTimer : [0, 0, 0],
        individualTimers:  individualTimers !== undefined ? individualTimers : [...newArray.fill([0, 0, 0])],
        scores: scores !== undefined ? scores : [...newArray.keys()].map(el => ({ name: `Player ${el + 1}`, scores: [[0, 0, 0]] }))
    };

    const [gameData, setGameData] = useState(compareObjectData(storageData, defaultData) ? storageData : defaultData);

    /**
     * Set the context data.
     * @param {Object} data Object containing key value pairs corresponding to the settings that will be updated.
     */
    const setData = (data) => {
        const newData = { ...gameData };

        for (const [key, value] of Object.entries(data)) {
            newData[key] = value;
        };

        saveToStorage("scGameDetails", newData);
        setGameData(newData);
    };

    return <GameContext.Provider value={{ gameData, setData }}>
        {children}
    </GameContext.Provider>;
};

export default GameContext;