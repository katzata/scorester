import { useEffect/* , useState */ } from "react";
import styles from "./Main.module.scss";

import ScoreColumn from "./ScoreColumn/ScoreColumn";

export default function Main({ numberOfPlayers }) {
    useEffect(() => {

    }, []);

    return <main className={styles.main}>
        {[...Array(numberOfPlayers).fill(0)].map((_, idx) => {
            return <ScoreColumn widthDivider={numberOfPlayers} key={`col${idx}`}/> 
        })}
    </main>;
};