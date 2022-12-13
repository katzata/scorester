import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

// import Timers from "./Timers/Timers";
import Modal from "../../shared/Modal/Modal";
import UserSettings from "./UserSettings/UserSettings";
import GameSettings from "./GameSettings/GameSettings";
import Icons from "../../shared/Icons/Icons";

export default function Header({ isLogged, handleLoggedState }) {
    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [gameSettingsVisible, setGameSettingsVisible] = useState(false);
    // const currentPlayers = [{ player: "p1", time: [0, 0, 0]}, { player: "p2", time: [0, 0, 0]}];

    useEffect(() => {
        // console.log("yay");
    }, [isLogged])

    return <header>
        {/* <Timers currentPlayers={currentPlayers}/> */}

        <h1 className={styles.headerTitle}>Scorester</h1>

        <div className={styles.buttonsContainer}>
            <div className={styles.buttonWrapper}>
                <button onClick={() => setUserSettingsVisible(true)}>
                    <Icons current={"user"}/>
                </button>

                <Modal isVisible={userSettingsVisible} visibilityHandler={setUserSettingsVisible}>
                    <UserSettings isLogged={isLogged} handleLoggedState={handleLoggedState} />
                </Modal>
            </div>

            <div className={styles.buttonWrapper}>
                <button onClick={() => setGameSettingsVisible(true)}>
                    <Icons current={"cog"}/>
                </button>

                <Modal isVisible={gameSettingsVisible} visibilityHandler={setGameSettingsVisible} options={"gameSettings"}>
                    <GameSettings isLogged={isLogged} handleLoggedState={handleLoggedState} />
                </Modal>
            </div>
        </div>
    </header>;
}