import { createContext, useState } from "react";
import { getStorage, setStorage } from "../services/storageService";
import { mergeObjectData } from "../utils/utils";

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
    
    const [userData, setUserData] = useState(mergeObjectData(storageData, defaultData));

    const setData = (data) => {
        const newData = { ...userData };

        for (const [key, value] of Object.entries(data)) {
            newData[key] = value;
        };

        setStorage({ key:"scUserDetails", value: newData});
        setUserData(newData);
    };

    const value = { userData, setData };
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
};

export default UserContext;