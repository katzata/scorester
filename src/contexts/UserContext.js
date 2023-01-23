import { createContext, useState } from "react";
import { getStorage } from "../services/storageService";
import { compareObjectData } from "../utils/utils";
import { saveToStorage } from "../services/storageService";

const UserContext = createContext();

export function UserProvider({ children }) {
    const storageData = getStorage("scUserDetails");
    const defaultData = {
        username: "",
        userSettings: { keepRecord: false },
        gameSettings: {
            numberOfPlayers: 1,
            mainTimer: false,
            individualTimers: false,
            turnDuration: 0,
            autoSwitchTurns: false,
            negativeValues: false,
            scoreBelowZero: false,
            scoreTarget: 0,
            editableFields: false
        }
    };
    const [userData, setUserData] = useState(compareObjectData(storageData, defaultData) ? storageData : defaultData);
    const setData = (data) => {
        const newData = { ...userData };

        for (const [key, value] of Object.entries(data)) {
            newData[key] = value;
        };

        saveToStorage("scUserDetails", newData);
        setUserData(newData);
    };

    return <UserContext.Provider value={{ userData, setData }}>
        {children}
    </UserContext.Provider>;
};

export default UserContext;