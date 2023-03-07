import { useCallback, useEffect, useState } from "react";

export default function useKeyPress() {
    const [keyCode, setKeyCode] = useState(null);

    const handleKeyPress = useCallback((e) => {
        const { code, key } = e;
        const currentKey = code !== "" ? code : key;
        const setAction = (type, command) => type === "keydown" ? command : null;
        let action = null;

        if (currentKey === "Enter" || currentKey === "NumpadEnter") {
            action = "enter";
        };

        if (currentKey === "Escape") {
            action = "cancel";
        };

        if (currentKey === "Pause") {
            action = "pause";
        };

        if (action) {
            setKeyCode(setAction(e.type, action));
        };
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("keyup", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, [handleKeyPress]);

    return [keyCode, handleKeyPress];
};