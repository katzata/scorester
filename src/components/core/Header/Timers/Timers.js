import { useEffect, useState } from "react";
import styles from "./Timers.module.scss";

export default function Timers({ numberOfPlayers, mainTimerVisible, individualTimersVisible }) {
    const [mainTimer, setMainTimer] = useState([0, 0, 0]);
    const [individualTimers, setTimers] = useState([{ player: "p1", time: [0, 0, 0]}]);
    // const [currentTimerIndex, setCurrentTimerIndex] = useState(0);

    const formatTimer = (time) => time < 10 ? `0${time}` : time;
    // const handleTimers = () => {
    //     setMainTimer();
    //     setTimers();
    // };

    const setIndividualTimers = (numberOfPlayers) => {
        // let players = [...Array(numberOfPlayers).fill(0)].map((_, idx) => { player: "p1", time: [0, 0, 0]});

        // for (const player of currentPlayers) {
        //     const playerExists = individualTimers.filter(el => el.name === player.name).length !== 0;
        //     if (playerExists) players.push({ player: player.name, time: [0, 0, 0]});
        // };
    };

    useEffect(() => {
        // console.log(individualTimers.length !== currentPlayers.lengt);
        // if (individualTimers.length !== currentPlayers.lengtj) handleNumberOfTimers(currentPlayers);
    }, [/* currentPlayers, individualTimers.length */]);

    return <section className={styles.timersSection}>
        { mainTimerVisible && <p className={styles.mainTimer}>{mainTimer.map(formatTimer).join(":")}</p>  }

        { individualTimersVisible && <div className={styles.individualTimersContainer}>
            <div className={styles.timersRow}>
                <div className={styles.iconContainer}>
                    <svg className={styles.timerIcon} width="1.2rem" height="1.2rem" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 50 50">
                        <path d="m44.4699707 18.7250366h-20.0199585c-3.0500488 0-5.5300293 2.4899902-5.5300293 5.539978v20.0100098c0 3.0499878 2.4799805 5.539978 5.5300293 5.539978h20.0199585c3.0500488 0 5.5300293-2.4899902 5.5300293-5.539978v-20.0100098c0-3.0499877-2.4799805-5.539978-5.5300293-5.539978zm-15.8999634 13.2799683c-2.0100098 0-3.6400146-1.6300049-3.6400146-3.6300049 0-2.0099487 1.6300049-3.6399536 3.6400146-3.6399536 2 0 3.6300049 1.6300049 3.6300049 3.6399536 0 2-1.6300049 3.6300049-3.6300049 3.6300049zm11.7799683 11.790039c-2 0-3.6300049-1.6300049-3.6300049-3.6300049 0-2.0100098 1.6300049-3.6400146 3.6300049-3.6400146 2.0100098 0 3.6300049 1.6300049 3.6300049 3.6400146 0 2.0000001-1.6199951 3.6300049-3.6300049 3.6300049z" fill="#ffffff"></path>
                        <path d="m24.4500122 16.7250366h8.6300049v-9.0100097c0-3.0499878-2.4800415-5.5300293-5.5300293-5.5300293h-20.0200195c-3.0499878 0-5.5299683 2.4800415-5.5299683 5.5300293v20.0200195c0 3.0499878 2.4799805 5.5299683 5.5299683 5.5299683h9.3900146v-9c0-4.1599732 3.3800049-7.5399781 7.5300293-7.5399781zm-1.0100098-8.5300293c2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049-2.0100098 0-3.6400146-1.6199951-3.6400146-3.6300049 0-2 1.6300049-3.6300049 3.6400146-3.6300049zm-11.790039 19.0500489c-2.0099487 0-3.6399536-1.6200562-3.6399536-3.6300049 0-2.0100098 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6199951 3.6300049 3.6300049 0 2.0099487-1.6300049 3.6300049-3.6300049 3.6300049zm0-11.7900391c-2.0099487 0-3.6399536-1.6199951-3.6399536-3.6300049 0-2 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049z" fill="#ffffff"></path>
                    </svg>
                </div>

                <div className={styles.timerContainer}>
                    {individualTimers.map((timer, idx) => {
                        const offsetY = idx * 115;
                        const currentTime = timer.time.map(formatTimer).join(":");
                        const timerStyle = { transform: `translateY(-${offsetY}%)` };

                        return <p className={styles.individualTimer} style={timerStyle} key={idx}>
                            {currentTime}
                        </p>;
                    })}
                </div>
            </div>
        </div>}
    </section>;
};