import { createContext, useMemo, useState, useCallback, useEffect } from "react";
import { getStorage, setStorage } from "../utils/localStorage";
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
            scoreTarget: "",
            editableFields: false
        }
    };

    const [userData, setUserData] = useState(mergeObjectData(storageData, defaultData));

    /**
     * Sets the user data.
     * @param {Object} data The new user details data object.
     * @param {Boolean} data Replace the userData object with the one that is being passed without any merging.
     */
    const setData = useCallback((data, replace) => {
        const newData = { ...userData };

        if (replace) {
            return setUserData(data);
        };

        if (data) {
            for (const [key, value] of Object.entries(data)) {
                newData[key] = value;
            };
        };

        if (data && data.id) {
            newData.isLogged = true;
        };

        setStorage({ key:"scUserDetails", value: newData});
        setUserData(newData);
    }, [userData]);

    useEffect(() => {
        if (storageData === null) setData();
    }, [storageData, setData]);

    const value = useMemo(() => ({ userData, setData }), [userData, setData]);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
};

export default UserContext;