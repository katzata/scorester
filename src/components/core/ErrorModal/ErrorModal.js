import { useContext, useEffect, useCallback, useState } from "react";
import styles from "./ErrorModal.module.scss";

import ErrorsContext from "../../../contexts/ErrorsContext";

export default function ErrorModal() {
    const { currentErrors } = useContext(ErrorsContext);
    const [isVisible, setIsVisible] = useState(false);
    
    const setVisibility = useCallback(setIsVisible, [setIsVisible]);

    useEffect(() => {
        if (currentErrors.lenth > 0) {
            setVisibility(true);
        };
    }, [currentErrors, setVisibility]);

    return <section className={styles.errorModalContainer} style={{ transform: `translateX(${!isVisible ? -100 : 0}%)`}}>
        <div className={styles.errorModalInternal}>
            {currentErrors.length > 0 && currentErrors.map((err, idx) => <p className={styles.error} key={`err${idx}`}>{err.text}</p>)}
        </div>
    </section>;
};