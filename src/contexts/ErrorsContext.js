import { createContext, useState, useMemo, useCallback } from "react";

const ErrorsContext = createContext();

export function ErrorsProvider({ children }) {
    const [currentErrors, setCurrentErrors] = useState([]);
    const [currentWarnings, setCurrentWarnings] = useState([]);

    /**
     * Sets the current error list.
     * @param {Object} newErrors An array contaning objects, each with a single key value pair.
     * @example
     * { tag: "login", text: "contains invalid characters." }
     */
    const setErrors = useCallback((type, errors) => {
        if (errors === "clear") return clearErrors(type);

        const incomingErrors = [...errors];
        const existingErrors = [...currentErrors];
        const existingWarnings = [...currentWarnings];

        for (const incomingError of incomingErrors) {
            const list = type === "errors" ? existingErrors : existingWarnings;

            if (list.length === 0) {
                list.push(incomingError);
            } else {
                const errors = list.filter(err => err.tag === incomingError.tag && err.text === incomingError.text);
                
                if (errors.length === 0) {
                    list.push(incomingError);
                };
            };
        };

        if (existingErrors.length !== currentErrors.length) {
            setCurrentErrors(existingErrors);
        };
        
        if (existingWarnings.length !== currentWarnings.length) {
            setCurrentWarnings(existingWarnings);
        };
    }, [currentErrors, currentWarnings]);

    /**
     * Clear the error/warnings list.
     * @param {String} type The type of error message list to be cleared.
     */
    const clearErrors = (type) => {
        if (type === "errors") {
            setCurrentErrors(() => []);
        };
        
        if (type === "warnings") {
            setCurrentWarnings(() => []);
        };
    };

    const value = useMemo(() => ({ currentErrors, currentWarnings, setErrors }), [currentErrors, currentWarnings, setErrors]);

    return <ErrorsContext.Provider value={value}>
        {children}
    </ErrorsContext.Provider>;
};

export default ErrorsContext;