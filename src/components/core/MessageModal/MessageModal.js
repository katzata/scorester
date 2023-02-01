import { useContext } from "react";
import styles from "./MessageModal.module.scss";

import ErrorsContext from "../../../contexts/ErrorsContext";
import MessagesContainer from "./MessagesContainer/MessagesContainer";

/**
 * 
 * @param {Object} props
 * @param {String} props.messageBg
 * @param {String} props.side
 * 
 * @props messageBg
 * @props side - left or right
 */
export default function MessageModal() {
    const errorsContext = useContext(ErrorsContext);
    const { currentErrors, currentWarnings } = errorsContext;

    /**
     * Clear the current errors list.
     */
    const clearCurrentErrors = () => {
        errorsContext.setErrors("errors", "clear");
    };

    /**
     * Clear the current warnings list.
     */
    const clearCurrentWarnings = () => {
        errorsContext.setErrors("warnings", "clear");
    };

    return <section className={styles.messageModalContainer}>
        <MessagesContainer
            type="errors"
            side="left"
            currentMessages={currentErrors}
            messageBg="rgba(200, 0, 0, 0.9)"
            clearMessages={clearCurrentErrors}
        />

        <MessagesContainer
            type="warnings"
            side="right"
            currentMessages={currentWarnings}
            messageBg="rgba(200, 200, 0, 0.9)"
            clearMessages={clearCurrentWarnings}
        />
    </section>;
};