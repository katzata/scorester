import { createContext, useState } from "react";
import { getStorage } from "../services/storageService";
import { compareObjectData } from "../utils/utils";
// import useFetch from "../hooks/useFetch";

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
        console.log(data);
        // setUserData();
    };

    // const userData = compareObjectData(storageData, defaultData) ? storageData : defaultData;

    return <UserContext.Provider value={{ ...userData, setData }} numberOfPlayers={userData.gameSettings.numberOfPlayers}>
        {children}
    </UserContext.Provider>;
};

export default UserContext;