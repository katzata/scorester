import { useState, useEffect, useCallback } from "react";
import styles from "./MessagesContainer.module.scss";

import Icons from "../../../shared/Icons/Icons";

export default function MessagesContainer({ currentMessages, side, messageBg, clearMessages }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExtended, setIsExtended] = useState(false);

    const sideCheck = side === "left";
    const baseX = sideCheck ? "3px" : "-3px";
    const offsetX = sideCheck ? "calc(-100% + 9px)" : "calc(100% - 9px)";

    const wrapperStyles = {
        [side]: "0px",
        backgroundColor: messageBg ? messageBg : "transparent",
        transform: `translateX(${ isExtended ? baseX : offsetX })`,
        opacity: isVisible ? 1 : 0,
        zIndex: sideCheck ? 1 : 0,
        display: currentMessages.length > 0 ? "inline-flex" : "none"
    };

    const posX = sideCheck ? "right" : "left";
    let deg = sideCheck ? [0, 180] : [180, 0];

    const hideButtonsStyles = {
        [posX]: "-9px",
        transform: `rotateZ(${isExtended ? deg[0] : deg[1]}deg)`
    };

    /**
     * Clear the "currentMessages" list.
     * Done with a delay for the dissolve animation.
     */
    const clearList = useCallback(() => {
        setIsVisible(false);
        setIsExtended(false);

        setTimeout(clearMessages, 200);
    }, [clearMessages]);

    useEffect(() => {
        if (currentMessages.length > 0) {
            setIsVisible(true);
            setIsExtended(true);
        } else {
            clearList();
        };
    }, [currentMessages.length, clearList]);

    return <div className={styles.shadowWrapper} style={wrapperStyles}>
        <div className={styles.modalInternalSection}>
            <button className={styles.closeButton} onClick={clearList} style={{ [posX]: "-9px" }}>
                <Icons current={"close"} size={17}/>
            </button>

            <div className={styles.messageList}>
                {currentMessages && currentMessages.map((err, idx) => <p className={styles.error} key={`err${idx}`}>{err.text}</p>)}
            </div>

            <button className={styles.hideButton} style={hideButtonsStyles} onClick={() => setIsExtended(!isExtended)}>
                <Icons current={"chevron"} size={17} />
            </button>
        </div>
    </div>;
};