import styles from "./Footer.module.scss";

import { useEffect } from "react";

export default function Footer({ isLogged, handleLoggedState }) {
    const textStyles = {
        fill: isLogged ? "rgb(240, 240, 240)" : "rgb(0, 97, 0)"
    }
    useEffect(() => {

    }, [isLogged]);

    return <footer>
        <button className={styles.startButton}>
            <svg>
                <filter id="filter">
                    <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#bbbbbb">
                    <fePointLight x="50" y="75" z="200" /></feSpecularLighting>
                    <feComposite
                        in="SourceGraphic"
                        in2="specOut"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                    />
                </filter>
                
                <rect x="0" y="0" width="100%" height="100%" fill="green"/>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={textStyles}>START</text>
            </svg>
            {/* <span>START</span> */}
        </button>
    </footer>;
};