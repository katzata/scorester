import { createContext, useEffect, /* useState, */ useReducer } from "react";
import { getStorage, setStorage } from "../services/storageService";
import { mergeObjectData } from "../utils/utils";

const GameContext = createContext();

export function GameProvider({ children }) {
    const storageData = getStorage("scGameDetails") || {};
    const { isPlaying, gamePaused, playerTurnIndex, mainTimer, individualTimers, scores } = storageData;
    const defaultData = {
        isPlaying: isPlaying !== undefined ? isPlaying : false,
        gamePaused: gamePaused !== undefined ? gamePaused : false,
        playerTurnIndex: playerTurnIndex !== undefined ? playerTurnIndex : 0,
        mainTimer: mainTimer !== undefined ? mainTimer : [0, 0, 0],
        scores: scores !== undefined ? scores : [...Array(1).keys()].map(el => ({ name: `Player ${el + 1}`, scores: [] })),
        individualTimers:  individualTimers !== undefined ? individualTimers : [...Array(1).fill([0, 0, 0])]
    };
    
    const [gameData, dispatch] = useReducer(reducer, mergeObjectData(storageData, defaultData));

    function reducer(state, action) {
        let newData = { ...state };

        switch (action.type) {
            case "start_game":
                newData.isPlaying = true;
                break;
            case "stop_game":
                newData.isPlaying = false;
                newData.gamePaused = false;
                break;
            case "pause_game":
                newData.gamePaused = true;
                break;
            case "resume_game":
                newData.gamePaused = false;
                break;
            case "score":
                newData.scores[newData.playerTurnIndex].scores.push(action.payload);
                const increment = newData.playerTurnIndex + 1;
                newData.playerTurnIndex = increment < scores.length ? increment : 0;
                break;
            case "player_name":
                const [nameIndex, newName] = action.payload;
                newData.scores[nameIndex].name = newName;
                break;
            case "number_of_players":
                while (newData.scores.length !== action.payload) {
                    if (newData.scores.length <= action.payload) {
                        console.log(newData.individualTimers);
                        newData.individualTimers.push([0, 0, 0]);
                        newData.scores.push({ name: `Player ${newData.scores.length + 1}`, scores: [] });
                        console.log(newData.individualTimers);
                    } else {
                        newData.scores.pop();
                        newData.individualTimers.pop();
                    };
                };
                break;
            default:
                return state;
        };
        // console.log(newData.individualTimers);
        setStorage({ key:"scGameDetails", value: newData});
        return newData;
    };

    /**
     * Set the context data.
     * @param {Object} data Object containing key value pairs corresponding to the settings that will be updated.
     */
    // function setData(data) {
    //     const newData = { ...gameData };

    //     for (const [key, value] of Object.entries(data)) {
    //         newData[key] = value;
    //         dispatch()
    //     };

    //     setStorage({ key:"scGameDetails", value: newData});
    //     setGameData(newData);

    //     return {
    //         start: dispatch("start_game")
    //     };
    // };

    useEffect(() => {
        console.log("asd");
    }, []);

    const value = { gameData, dispatch };
    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>;
};

export default GameContext;