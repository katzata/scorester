import { useContext, useEffect, useCallback, useState } from "react";
import styles from "./ErrorModal.module.scss";

import ErrorsContext from "../../../contexts/ErrorsContext";
import Icons from "../../shared/Icons/Icons";

export default function ErrorModal() {
    const errorsContext = useContext(ErrorsContext);
    const { currentErrors } = errorsContext;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currentErrors.length !== 0 && !isVisible) {
            setIsVisible(true);
            console.log(currentErrors.length, Object.keys(errorsContext).length);
        }
        
    });

    return <section className={styles.errorModalContainer} style={{ transform: `translateX(${!isVisible ? -100 : 0}%)`}}>
        <button className={styles.closeButton}>
            <Icons current={"close"}/>
        </button>
        <div className={styles.errorModalInternal}>
            {errorsContext.currentErrors.map((err, idx) => <p className={styles.error} key={`err${idx}`}>{err.text}</p>)}
        </div>
    </section>;
};