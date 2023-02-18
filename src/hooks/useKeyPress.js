import { useEffect, useState } from "react";

export default function useKeyPress() {
    const [keyCode, setKeyCode] = useState(null);

    const handleKeyPress = (e) => {
        const { code } = e;
        const setAction = (type, command) => type === "keydown" ? command : null;
        let action = null;

        if (code === "Enter" || code === "NumpadEnter") {
            action = "enter";
        };

        if (code === "Escape") {
            action = "cancel";
        };

        if (code === "Pause") {
            action = "pause";
        };

        if (action) {
            setKeyCode(setAction(e.type, action));
        };
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("keyup", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
            window.removeEventListener("keyup", handleKeyPress)
        };
    }, []);

    return [keyCode, handleKeyPress];
};