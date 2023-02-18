import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import { getStorage, setStorage } from "../utils/localStorage";
import { mergeObjectData } from "../utils/utils";

const GameContext = createContext();

export function GameProvider({ children }) {
    const storageData = getStorage("scGameDetails") || {};
    const { isPlaying, gamePaused, playerTurnIndex, mainTimer, individualTimers, scores } = storageData;
    const defaultData = {
        isPlaying: isPlaying !== undefined ? isPlaying : false,
        gamePaused: gamePaused !== undefined ? gamePaused : false,
        playerTurnIndex: playerTurnIndex !== undefined ? playerTurnIndex : 0,
        mainTimer: mainTimer !== undefined ? mainTimer : 0,
        scores: scores !== undefined ? scores : [...Array(1).keys()].map(el => ({ name: `Player ${el + 1}`, scores: [], scoreTotal: 0 })),
        individualTimers:  individualTimers !== undefined ? individualTimers : [...Array(1).fill(0)]
    };
    
    const [gameData, dispatch] = useReducer(reducer, mergeObjectData(storageData, defaultData));

    /**
     * Sets the current context state according to the provided actions.
     * Saves to local storage the updated state.
     * @param {Object.<any>} state The current state.
     * @param {Object} action The current action (may have payload).
     * @actions
     * - start_game
     * - stop_game
     * - pause_game
     * - resume_game
     * - score - payload Number
     * - player_name - payload String
     * - number_of_players - payload Number
     * @returns An updated state object.
     */
    function reducer(state, action) {
        let newData = { ...state };

        switch (action.type) {
            case "start_game":
                newData.isPlaying = true;
                return newData;
            case "stop_game":
                newData.isPlaying = false;
                newData.gamePaused = false;
                newData.mainTimer = 0;
                newData.playerTurnIndex = 0;

                for (let i = 0; i < newData.scores.length; i++) {
                    newData.scores[i].scores = [];
                    newData.scores[i].scoreTotal = 0;
                    newData.individualTimers[i] = 0;
                };

                return newData;
            case "pause_game":
                newData.gamePaused = true;
                return newData;
            case "resume_game":
                newData.gamePaused = false;
                return newData;
            case "score":
                const { score } = action.payload || 0;
                const increment = newData.playerTurnIndex + 1;

                newData.scores[newData.playerTurnIndex].scoreTotal += score;
                newData.scores[newData.playerTurnIndex].scores.push(score);
                newData.playerTurnIndex = increment < scores.length ? increment : 0;

                return newData;
            case "player_name":
                const [nameIndex, newName] = action.payload;
                newData.scores[nameIndex].name = newName;
                return newData;
            case "number_of_players":
                while (newData.scores.length !== action.payload) {
                    if (newData.scores.length <= action.payload) {
                        newData.individualTimers.push(0);
                        newData.scores.push({ name: `Player ${newData.scores.length + 1}`, scores: [] });
                    } else {
                        newData.scores.pop();
                        newData.individualTimers.pop();
                        
                        if (newData.playerTurnIndex >= newData.scores.length) {
                            newData.playerTurnIndex = newData.scores.length - 1;
                        };
                    };
                };
                return newData;
            case "timers_update":
                const { mainTimerVisible, individualTimersVisible } = action.payload;

                if (mainTimerVisible) {
                    newData.mainTimer += 1;
                };

                if (individualTimersVisible) {
                    newData.individualTimers[playerTurnIndex] += 1;
                };

                return newData;
            default:
                return state;
        };
    };

    /**
     * Update the localStorage object.
     */
    const updateStorage = useCallback(() => setStorage({ key:"scGameDetails", value: gameData}), [gameData])

    useEffect(() => {
        updateStorage();
    }, [gameData, updateStorage]);

    const value = useMemo(() => ({ gameData, dispatch }), [gameData]);
    
    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>;
};

export default GameContext;