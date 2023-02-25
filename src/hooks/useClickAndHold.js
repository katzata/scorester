import { useEffect, useState } from "react";

/**
 * A hook that handles hold functionality.
 * @returns An array containing the hold trigger (holdTrigger), the holding toggle (setIsHolding) and the possibility to set a custom delay (setDelay).
 */
export default function useClickAndHold() {
    const [timeStamp, setTimeStamp] = useState(null);
    const [holdTrigger, setHoldTrigger] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [delay, setDelay] = useState(1200);

    const getTimeStamp = () => new Date().getTime();

    useEffect(() => {
        let holdCheckInterval;

        if (isHolding) {
            setTimeStamp(getTimeStamp());

            holdCheckInterval = setInterval(() => {
                const currentTimeStamp = getTimeStamp();

                if (currentTimeStamp >= timeStamp + delay) {
                    setHoldTrigger(true);
                    setIsHolding(false);
                };
            }, 100);
        } else {
            clearInterval(holdCheckInterval);
            setHoldTrigger(false);
        };

        return () => clearInterval(holdCheckInterval);
    }, [isHolding, timeStamp, delay]);

    return [holdTrigger, setIsHolding, setDelay];
};