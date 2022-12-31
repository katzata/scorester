import { useEffect, useState } from "react";

/**
 * A custom hook that 
 * @returns An array containing the hold trigger (holdTrigger), the holding toggle (setIsHolding) and the possibility to set a custom delay (setDelay).
 */
export default function useTimer() {
    const [isHolding, setIsHolding] = useState(false);

    useEffect(() => {
        let holdCheckInterval = setInterval(() => {
            console.log("x");
        }, 1000);

        return () => clearInterval(holdCheckInterval);
    }, [isHolding, timeStamp, delay]);

    return [holdTrigger, setIsHolding];
};