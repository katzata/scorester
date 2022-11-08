import styles from "./Header.module.scss";

import Timers from "./Timers/Timers";
import Modal from "../../shared/OptionsModal/OptionsModal";
import { useState } from "react";

export default function Header() {
    const [userOptionsVisible, setUserOptionsVisible] = useState(false);
    const currentPlayers = [{ player: "p1", time: [0, 0, 0]}, { player: "p2", time: [0, 0, 0]}];

    return <header>
        <Timers currentPlayers={currentPlayers}/>

        <h1 className={styles.headerTitle}>Scorester</h1>

        <div className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserOptionsVisible(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="40%" stopColor="rgba(255, 255, 255, .85)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, .8)" />
                        </linearGradient>

                        <path d="M463.2,256c0,29.3,16.3,54,48.8,74.4c-4.9,16.3-11.8,32.9-20.7,50c-28.4-7.3-56.1,1.6-82.9,26.8
                            c-21.9,23.6-28.9,51.2-20.7,82.9c-16.3,8.1-33.3,15.4-51.2,21.9c-18.7-33.3-45.5-50-80.5-50s-61.8,16.7-80.5,50
                            c-17.9-6.5-34.9-13.8-51.2-21.9c8.1-32.5,1.2-60.1-20.7-82.9c-21.9-21.9-49.6-28.9-82.9-20.7C15,375.9,8.1,359.2,0,336.5
                            c33.3-21.1,50-47.9,50-80.5c0-29.3-16.7-54.5-50-75.6c8.1-22.8,15-39.4,20.7-50c30.1,7.3,57.7-1.6,82.9-26.8
                            c21.9-22.8,28.9-50.4,20.7-82.9c17.1-8.9,34.1-15.8,51.2-20.7c18.7,32.5,45.5,48.8,80.5,48.8S317.8,32.5,336.5,0
                            c17.1,4.9,34.1,11.8,51.2,20.7c-8.1,31.7-1.2,59.3,20.7,82.9c26.8,25.2,54.5,34.1,82.9,26.8c8.9,17.1,15.8,33.7,20.7,50
                            C479.5,200.7,463.2,225.9,463.2,256 M256,366.9c30.9,0,57.1-10.8,78.6-32.3s32.3-47.7,32.3-78.6s-10.8-57.3-32.3-79.2
                            s-47.7-32.9-78.6-32.9s-57.1,11-78.6,32.9s-32.3,48.4-32.3,79.2s10.8,57.1,32.3,78.6S225.1,366.9,256,366.9" fill="url(#grad)"
                        />
                    </svg>
                </button>

                <Modal isVisible={userOptionsVisible} visibilityHandler={setUserOptionsVisible} options={[{ title: "test option", type: "select", values: [""]}]}/>
            </div>

            <div className={styles.buttonWrapper}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M437.02,74.981C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.981C26.629,123.333,0,187.62,0,256
                            s26.629,132.667,74.98,181.019C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.981
                            C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.981z M256,482c-66.869,0-127.037-29.202-168.452-75.511
                            C113.223,338.422,178.948,290,256,290c-49.706,0-90-40.294-90-90s40.294-90,90-90s90,40.294,90,90s-40.294,90-90,90
                            c77.052,0,142.777,48.422,168.452,116.489C383.037,452.798,322.869,482,256,482z" fill="#ffffff"
                        />
                    </svg>
                </button>

                <Modal />
            </div>
        </div>
    </header>;
}