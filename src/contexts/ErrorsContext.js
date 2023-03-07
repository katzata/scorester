import { createContext, useReducer, useMemo } from "react";

const ErrorsContext = createContext();

export function ErrorsProvider({ children }) {
    const [errorData, dispatch] = useReducer(reducer, { errors: [], warnings: [] });

    /**
     * Sets the current error list.
     * @param {Object} newErrors An array containing objects, each with a single key value pair.
     * @example
     * { tag: "login", text: "contains invalid characters." }
     */
    function reducer(state, action) {
        const { payload } = action;
        const newState = (list, prevState) => prevState[list].length > 0 ? [...prevState[list]] : [];
        const newErrors = [...state.errors];
        const newWarnings = [...state.warnings];

        switch (action.type) {
            case "add_errors":
                console.log(state.errors);
                return {
                    ...state,
                    // errors: payload.filter(el => state.errors.includes())
                    errors: setErrorData("add", payload, newState("errors", state))
                };
            case "remove_errors":
                return {
                    ...state,
                    errors: setErrorData("remove", payload, newState("errors", state))
                };
            case "add_warnings":
                return {
                    ...state,
                    warnings: setErrorData("add", payload, newState("warnings", state))
                };
            case "remove_warnings":
                return {
                    ...state,
                    warnings: setErrorData("remove", payload, newState("warnings", state))
                };
            case "clear":
                return {
                    ...state,
                    [payload]: []
                };
            default:
                return state;
        };
    };

    /**
     * Add or remove errors.
     * @param {String} action The current action (add/remove).
     * @param {Array<object>} incomingErrors An array of error objects.
     * @param {Array<object>} existingErrors An array of error objects.
     * @returns The updated existing errors array.
     */
    function setErrorData(action, incomingErrors, existingErrors) {
        for (const incomingError of incomingErrors) {
            if (action === "add") {
                if (existingErrors.length === 0) {
                    existingErrors.push(incomingError);
                } else {
                    const errors = existingErrors.filter(err => err.tag === incomingError.tag && err.text === incomingError.text);

                    if (errors.length === 0) {
                        existingErrors.push(incomingError);
                    };
                };
            };

            if (action === "remove") {
                for (let i = 0; i < existingErrors.length; i++) {
                    const incomingError = incomingErrors[0];

                    if (incomingError.subTag === existingErrors[i].subTag && incomingError.text === existingErrors[i].text) {
                        existingErrors.splice(i, 1);
                        break;
                    };
                };
            };
        };
        console.log(existingErrors);
        return existingErrors;
    };

    const value = useMemo(() => ({ ...errorData, dispatch }), [errorData, dispatch]);

    return <ErrorsContext.Provider value={value}>
        {children}
    </ErrorsContext.Provider>;
};

export default ErrorsContext;