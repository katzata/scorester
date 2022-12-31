import { useEffect, useState } from "react";
import styles from "./Timers.module.scss";

import SvgTimer from "../../../shared/SvgTimer/SvgTimer";
import { getStorage, setStorage } from "../../../../services/storageService";

export default function Timers({ isPlaying, gamePaused, playerTurnIndex, numberOfPlayers, mainTimerVisible, individualTimersVisible }) {
    const [mainTimer, setMainTimer] = useState([0, 0, 0]);
    const [individualTimers, setIndividualTimers] = useState([...Array(numberOfPlayers).fill([0, 0, 0])]);

    const handleTimers = () => {
        if (mainTimerVisible && !gamePaused) {
            handleMainTimer();
        };

        if (individualTimersVisible && !gamePaused) {
            handleIndividualTimers();
        };

        handleSaveToStorage();
    };
    
    const handleMainTimer = () => {
        const newTimer = handleTimerIncrease(mainTimer);
        setMainTimer(newTimer);
    };

    const handleIndividualTimers = () => {
        const newIndividualTime = handleTimerIncrease(individualTimers[playerTurnIndex]);
        const newTimers = [...individualTimers];

        newTimers[playerTurnIndex] = newIndividualTime;
        setIndividualTimers(newTimers);
    };

    const handleTimerIncrease = (timer) => {
        if (timer[2] + 1 < 60) {
            timer[2]++;
        } else {
            timer[1]++;
            timer[2] = 0;

            if (timer[1] + 1 < 60) {
                timer[1]++;
            } else {
                timer[0]++;
                timer[1] = 0;
            };
        };

        return [...timer];
    };

    const handleSaveToStorage = () => {
        const gameData = getStorage("scGameDetails");
        gameData.mainTimer = mainTimer;
        gameData.individualTimers = individualTimers;

        setStorage({ key: "scGameDetails", value: gameData});
    };

    const resetTimers = () => {
        setMainTimer([0, 0, 0]);

        if (individualTimers.length > 0) {
            setIndividualTimers([...individualTimers.map(() => [0, 0, 0])]);
        };
    };

    useEffect(() => {
        const gameData = getStorage("scGameDetails");

        if (gameData) {
            setIndividualTimers(gameData.individualTimers);
            // console.log(gameData.individualTimers);
        };

        if (isPlaying && (mainTimerVisible || individualTimersVisible)) {
            let holdCheckInterval = setInterval(handleTimers, 1000);
            return () => clearInterval(holdCheckInterval);
        };

        if (!isPlaying) {
            resetTimers();
        };
    }, [isPlaying, gamePaused, mainTimerVisible, individualTimersVisible]);

    return <section className={styles.timersSection}>
        { mainTimerVisible && <SvgTimer id="main" digits={mainTimer}/> }

        { individualTimersVisible && <div className={styles.individualTimersContainer}>
            <svg className={styles.timerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <path d="m44.4699707 18.7250366h-20.0199585c-3.0500488 0-5.5300293 2.4899902-5.5300293 5.539978v20.0100098c0 3.0499878 2.4799805 5.539978 5.5300293 5.539978h20.0199585c3.0500488 0 5.5300293-2.4899902 5.5300293-5.539978v-20.0100098c0-3.0499877-2.4799805-5.539978-5.5300293-5.539978zm-15.8999634 13.2799683c-2.0100098 0-3.6400146-1.6300049-3.6400146-3.6300049 0-2.0099487 1.6300049-3.6399536 3.6400146-3.6399536 2 0 3.6300049 1.6300049 3.6300049 3.6399536 0 2-1.6300049 3.6300049-3.6300049 3.6300049zm11.7799683 11.790039c-2 0-3.6300049-1.6300049-3.6300049-3.6300049 0-2.0100098 1.6300049-3.6400146 3.6300049-3.6400146 2.0100098 0 3.6300049 1.6300049 3.6300049 3.6400146 0 2.0000001-1.6199951 3.6300049-3.6300049 3.6300049z" fill="#ffffff"></path>
                <path d="m24.4500122 16.7250366h8.6300049v-9.0100097c0-3.0499878-2.4800415-5.5300293-5.5300293-5.5300293h-20.0200195c-3.0499878 0-5.5299683 2.4800415-5.5299683 5.5300293v20.0200195c0 3.0499878 2.4799805 5.5299683 5.5299683 5.5299683h9.3900146v-9c0-4.1599732 3.3800049-7.5399781 7.5300293-7.5399781zm-1.0100098-8.5300293c2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049-2.0100098 0-3.6400146-1.6199951-3.6400146-3.6300049 0-2 1.6300049-3.6300049 3.6400146-3.6300049zm-11.790039 19.0500489c-2.0099487 0-3.6399536-1.6200562-3.6399536-3.6300049 0-2.0100098 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6199951 3.6300049 3.6300049 0 2.0099487-1.6300049 3.6300049-3.6300049 3.6300049zm0-11.7900391c-2.0099487 0-3.6399536-1.6199951-3.6399536-3.6300049 0-2 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049z" fill="#ffffff"></path>
            </svg>

            <div className={styles.individualTimers}>
                {individualTimers && individualTimers.map((timer, idx) => {
                    const offset = idx * 100;
                    
                    return <SvgTimer
                        id={`individual${idx}`}
                        digits={timer}
                        width="70"
                        height="100%"
                        style={{ transform: `translateX(-${offset}%)` }}
                        key={`individual${idx}`}
                    />
                })}
            </div>
        </div>}
    </section>;
};