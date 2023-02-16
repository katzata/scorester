import { useEffect, useState } from "react";

export default function useKeyPress() {
    const [keyCode, setKeyCode] = useState(null);

    const handleKeyPress = (e) => {
        const { code } = e;
        const setAction = (type, command) => type === "keydown" ? command : null;

        const actions = {
            Enter: function (e) {
                setKeyCode(setAction(e.type, "enter"));
            },
            Escape: (e) => {
                setKeyCode(setAction(e.type, "cancel"));
            },
            Pause: (e) => {
                setKeyCode(setAction(e.type, "pause"));
            }
        };

        if (actions[code]) actions[code](e);
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