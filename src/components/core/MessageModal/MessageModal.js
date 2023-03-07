import { useCallback, useContext } from "react";
import styles from "./MessageModal.module.scss";

import ErrorsContext from "../../../contexts/ErrorsContext";
import MessagesContainer from "./MessagesContainer/MessagesContainer";

/**
 * @param {Object} props
 * @param {String} props.messageBg
 * @param {String} props.side
 * 
 * @props messageBg
 * @props side - left or right
 */
export default function MessageModal() {
    const errorsContext = useContext(ErrorsContext);
    const { errors, warnings, dispatch } = errorsContext;

    /**
     * Clear the current errors list.
     */
    const clearCurrentErrors = useCallback(() => {
        dispatch({ type: "clear", payload: "errors" });
    }, [dispatch]);

    /**
     * Clear the current warnings list.
     */
    const clearCurrentWarnings = useCallback(() => {
        dispatch({ type: "clear", payload: "warnings" });
    }, [dispatch]);

    return <section id="messageModal" className={styles.messageModalContainer}>
        <MessagesContainer
            type="errors"
            side="left"
            currentMessages={errors}
            messageBg="rgba(160, 0, 0, 0.9)"
            clearMessages={clearCurrentErrors}
        />

        <MessagesContainer
            type="warnings"
            side="right"
            currentMessages={warnings}
            messageBg="rgba(160, 160, 0, 0.9)"
            clearMessages={clearCurrentWarnings}
        />
    </section>;
};