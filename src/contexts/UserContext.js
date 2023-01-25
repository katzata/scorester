import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getStorage/* , setStorage */ } from "../utils/localStorage";
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
    
    const [userData, /* setUserData */] = useState(mergeObjectData(storageData, defaultData));
    const [isLoggedCheck, /* error, loading */] = useFetch("", null, true);

    const setData = (data) => {
        // const newData = { ...userData };
        console.log(data);
        // for (const [key, value] of Object.entries(data)) {
        //     newData[key] = value;
        // };

        // setStorage({ key:"scUserDetails", value: newData});
        // setUserData(newData);
    };

    useEffect(() => {
        if (isLoggedCheck) {
            setData(isLoggedCheck);
            // console.log(userData);
        }
    }, [isLoggedCheck]);

    const value = { userData, setData };
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
};

export default UserContext;