export const setStorage = (storageData) => {
    if (storageData instanceof Array) {
        for (const data of storageData) {
            window.localStorage.setItem(data.key, data.value);
        };
    } else {
        window.localStorage.setItem(storageData.key, storageData.value);
    };
    console.log(window.localStorage);
};

export const getStogare = (storageKeys) => {
    if (storageKeys instanceof Array) {
        const data = [];

        for (const key of storageKeys) {
            data.push(window.localStorage.getItem(key));
        };

        return data;
    } else {
        return window.localStorage.getItem(storageKeys)
    };
};