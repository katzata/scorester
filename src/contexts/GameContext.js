import { createContext, useMemo, useReducer } from "react";
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
        scores: scores !== undefined ? scores : [...Array(1).keys()].map(el => ({ name: `Player ${el + 1}`, scores: [] })),
        individualTimers:  individualTimers !== undefined ? individualTimers : [...Array(1).fill(0)]
    };
    
    const [gameData, dispatch] = useReducer(reducer, mergeObjectData(storageData, defaultData));

    /**
     * Sets the current context state accourding to the provided actions.
     * Saves to local storage the updated state.
     * @param {Object.<any>} state The current state.
     * @param {Object} action The current action (may have payload).
     * @actions
     * - start_game
     * - stop_game
     * - pause_game
     * - resume_game
     * - score - paylode Number
     * - player_name - paylode String
     * - number_of_players - paylode Number
     * @returns The updated state object.
     * !!!
     * Break instead of return.
     * Returning the state at the end makes updating the state and storage with the same data object.
     * !!!
     */
    function reducer(state, action) {
        let newData = { ...state };

        switch (action.type) {
            case "start_game":
                newData.isPlaying = true;
                break;
            case "stop_game":
                newData.isPlaying = false;
                newData.gamePaused = false;
                newData.mainTimer = 0;
                newData.playerTurnIndex = 0;

                for (let i = 0; i < newData.scores.length; i++) {
                    newData.scores[i].scores = [];
                    newData.individualTimers[i] = 0;
                };

                break;
            case "pause_game":
                newData.gamePaused = true;
                break;
            case "resume_game":
                newData.gamePaused = false;
                break;
            case "score":
                const increment = newData.playerTurnIndex + 1;
                newData.scores[newData.playerTurnIndex].scores.push(action.payload);
                newData.playerTurnIndex = increment < scores.length ? increment : 0;
                break;
            case "player_name":
                const [nameIndex, newName] = action.payload;
                newData.scores[nameIndex].name = newName;
                break;
            case "number_of_players":
                while (newData.scores.length !== action.payload) {
                    if (newData.scores.length <= action.payload) {
                        newData.individualTimers.push(0);
                        newData.scores.push({ name: `Player ${newData.scores.length + 1}`, scores: [] });
                    } else {
                        newData.scores.pop();
                        newData.individualTimers.pop();
                    };
                };
                break;
            case "timers_update":
                const { mainTimerVisible, individualTimersVisible } = action.payload;

                if (mainTimerVisible) {
                    newData.mainTimer += 1;
                };

                if (individualTimersVisible) {
                    newData.individualTimers[playerTurnIndex] += 1;
                };
                break;
            default:
                return state;
        };

        setStorage({ key:"scGameDetails", value: newData});
        return newData;
    };

    const value = useMemo(() => ({ gameData, dispatch }), [gameData]);
    
    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>;
};

export default GameContext;