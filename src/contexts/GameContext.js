import { createContext, useState } from "react";
import { getStorage, saveToStorage } from "../services/storageService";
import { compareObjectData } from "../utils/utils";

const GameContext = createContext();

export function GameProvider({ children, numberOfPlayers }) {
    const newArray = Array(numberOfPlayers);
    const storageData = getStorage("scGameDetails");
    const defaultData = {
        isPlaying: false,
        gamePaused: false,
        playerTurnIndex: 0,
        mainTimer: [0, 0, 0],
        individualTimers: [...newArray.fill([0, 0, 0])],
        scores: [...newArray.keys()].map(el => ({ name: `Player ${el + 1}`, scores: [[0, 0, 0]] }))
    };

    const [gameData, setGameData] = useState(compareObjectData(storageData, defaultData) ? storageData : defaultData);

    const setData = (data) => {
        const [key, value] = Object.entries(data)[0];
        const newData = { ...gameData };
        newData[key] = value;

        saveToStorage("scGameDetails", newData);
        setGameData(newData);
    };

    return <GameContext.Provider value={{ gameData, setData }}>
        {children}
    </GameContext.Provider>;
};

export default GameContext;