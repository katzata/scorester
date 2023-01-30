import { createContext, useMemo, useState } from "react";

const ErrorsContext = createContext();

export function ErrorsProvider({ children }) {
    const [currentErrors, setCurrentErrors] = useState([]);

    /**
     * Sets the current error list.
     * @param {Object} newErrors An array contaning objects, each with a single key value pair.
     * @example
     * { tag: "login", subTag: "chars", text: "contains invalid characters." }
     */
    const setErrors = (newErrors) => {
        const incomingErrors = [...newErrors];
        const existingErrors = [...currentErrors];

        for (const incomingError of incomingErrors) {
            if (existingErrors.length === 0) {
                existingErrors.push(incomingError);
            } else {
                const error = existingErrors.filter(err => err.tag === incomingError.tag && err.subTag === incomingError.subTag && err.text === incomingError.text);
                
                if (!error) {
                    existingErrors.push(incomingError);
                };
            };

        };

        setCurrentErrors(existingErrors);
    };
    
    
    const value = useMemo(() => ({ currentErrors, setErrors }), [currentErrors]);

    return <ErrorsContext.Provider value={value}>
        {children}
    </ErrorsContext.Provider>;
};

export default ErrorsContext;