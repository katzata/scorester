import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import { getStorage, setStorage } from "../utils/localStorage";
import { mergeObjectData } from "../utils/utils";

const GameContext = createContext();

export function GameProvider({ children }) {
    const storageData = getStorage("scGameDetails") || {};
    const { isPlaying, gamePaused, initialGameTs, pausesDuration, playerTurnIndex, mainTimer, individualTimers, scores } = storageData;
    const defaultData = {
        isPlaying: isPlaying !== undefined ? isPlaying : false,
        gamePaused: gamePaused !== undefined ? gamePaused : false,
        initialGameTs: initialGameTs !== undefined ? initialGameTs : 0,
        pausesDuration: pausesDuration !== undefined ? pausesDuration : { total: 0, pausedAt: 0 },
        playerTurnIndex: playerTurnIndex !== undefined ? playerTurnIndex : 0,
        mainTimer: mainTimer !== undefined ? mainTimer : 0,
        scores: scores !== undefined ? scores : [...Array(1).keys()].map(el => ({ name: `Player ${el + 1}`, scores: [], scoreTotal: 0 })),
        individualTimers:  individualTimers !== undefined ? individualTimers : [...Array(1).fill({ elapsed: 0, currentTs: 0, total: 0, pausesDuration: { pausedAt : 0 } })]
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
     * - add_score - payload Number
     * - edit_score - payload Number
     * - player_name - payload String
     * - number_of_players - payload Number
     * - timers_update - payload Object
     * @returns An updated state object.
     */
    function reducer(state, action) {
        switch (action.type) {
            case "start_game":
                return {...state, ...action.payload};
            case "stop_game":
                return {...state, ...action.payload};
            case "pause_game":
                return {...state, ...action.payload};
            case "resume_game":
                return {...state, ...action.payload};
            case "add_score":
                return {...state, ...action.payload};
            case "edit_score":
                return {...state, ...action.payload};
            case "player_name":
                return {...state, ...action.payload};
            case "number_of_players":
                return {...state, ...action.payload};
            case "timers_update":
                return {...state, ...action.payload};
            case "timers_reset":
                return {...state, ...action.payload};
            default:
                return state;
        };
    };

    /**
     * Dispatch the appropriate actions and update the localStorage object.
     */
    const setData = useCallback(({ type, payload }) => {
        const newData = { ...gameData };
        const tStamp = Date.now();

        if (type === "start_game") {
            newData.isPlaying = true;

            if (payload.mainTimerVisible || payload.individualTimers) {
                newData.initialGameTs = tStamp;
            };

            if (payload.individualTimers) {
                newData.individualTimers[newData.playerTurnIndex].currentTs = tStamp;
            };
        };

        if (type === "stop_game") {
            newData.isPlaying = false;
            newData.gamePaused = false;
            newData.playerTurnIndex = 0;
            newData.mainTimer = 0;
            newData.initialGameTs = 0;
            newData.pausesDuration = { total: 0, pausedAt: 0 };

            for (let i = 0; i < newData.scores.length; i++) {
                newData.scores[i].scores = [];
                newData.scores[i].scoreTotal = 0;
                newData.individualTimers[i] = { elapsed: 0, currentTs: 0, total: 0, pausesDuration: { pausedAt : 0 } };
            };
        };

        if (type === "pause_game") {
            newData.gamePaused = true;

            if (newData.mainTimer > 0) {
                newData.pausesDuration.pausedAt = tStamp;
            };
        };

        if (type === "resume_game") {
            newData.gamePaused = false;

            if (newData.mainTimer > 0) {
                newData.initialGameTs += tStamp - newData.pausesDuration.pausedAt;
            };

            if (newData.individualTimers[newData.playerTurnIndex].currentTs > 0) {
                newData.individualTimers.map(el => ({
                    ...el,
                    currentTs: el.currentTs += tStamp - newData.pausesDuration.pausedAt
                }));
            };

            if (newData.pausesDuration.pausedAt !== 0) {
                newData.pausesDuration.pausedAt = 0;
            };
        };

        if (type === "add_score") {
            const newTurnIndex = newData.playerTurnIndex + 1 < newData.scores.length ? newData.playerTurnIndex + 1 : 0;

            newData.scores[newData.playerTurnIndex].scoreTotal += (payload || 0);
            newData.scores[newData.playerTurnIndex].scores.push(payload);

            if (newData.individualTimers[newData.playerTurnIndex].elapsed > 0 || newData.individualTimers[newData.playerTurnIndex].total > 0) {
                newData.individualTimers[newData.playerTurnIndex].total = newData.individualTimers[newData.playerTurnIndex].elapsed;
            };

            newData.playerTurnIndex = newTurnIndex;
            newData.individualTimers[newTurnIndex].currentTs = tStamp;
        };

        if (type === "edit_score") {
            newData.scores[payload.playerIndex].scores = payload.scores;
            newData.scores[payload.playerIndex].scoreTotal = Number([...payload.scores].reduce((a, b) => a + b));
        };

        if (type === "player_name") {
            newData.scores[payload.index].name = payload.name;
        };

        if (type === "number_of_players") {
            while (newData.scores.length !== payload) {
                if (newData.scores.length <= payload) {
                    newData.individualTimers.push({ elapsed: 0, currentTs: 0, total: 0, pausesDuration: { pausedAt : 0 } });
                    newData.scores.push({ name: `Player ${newData.scores.length + 1}`, scores: [], scoreTotal: 0 });
                } else {
                    newData.scores.pop();
                    newData.individualTimers.pop();

                    if (newData.playerTurnIndex >= newData.scores.length) {
                        newData.playerTurnIndex = newData.scores.length - 1;
                    };
                };
            };
        };

        if (type === "timers_update") {
            const { mainTimerVisible, individualTimersVisible } = payload;

            if (mainTimerVisible) {
                if (newData.initialGameTs === 0) {
                    newData.initialGameTs = tStamp;
                };

                const timeElapsed = tStamp - newData.initialGameTs;
                newData.mainTimer = timeElapsed;
            } else {
                if (newData.mainTimer !== 0) newData.mainTimer = 0;
            };

            if (individualTimersVisible) {
                if (newData.individualTimers[newData.playerTurnIndex].currentTs === 0) {
                    newData.individualTimers[newData.playerTurnIndex].currentTs = tStamp;
                };

                const timeElapsed = tStamp - newData.individualTimers[newData.playerTurnIndex].currentTs;
                newData.individualTimers[newData.playerTurnIndex].elapsed = newData.individualTimers[newData.playerTurnIndex].total + timeElapsed;
            } else {
                if (newData.individualTimers[newData.playerTurnIndex].elapsed !== 0) newData.individualTimers[newData.playerTurnIndex].elapsed = 0;
            };

            if (!mainTimerVisible && newData.initialGameTs !== 0) {
                newData.initialGameTs = 0;
            };
        };

        if (type === "timers_reset") {
            if (payload === "mainTimer") {
                newData.initialGameTs = 0;
                newData.mainTimer = 0;
            };

            if (payload === "individualTimers") {
                newData.individualTimers = newData.individualTimers.map(() => ({
                    elapsed: 0,
                    currentTs: 0,
                    total: 0,
                    pausesDuration: { pausedAt : 0 }
                }));
            };
        };

        setStorage({ key:"scGameDetails", value: newData });

        if (type) {
            dispatch({ type, payload: newData });
        };
    }, [gameData]);

    const value = useMemo(() => ({ gameData, setData }), [gameData, setData]);

    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>;
};

export default GameContext;