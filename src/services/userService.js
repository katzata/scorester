import { setStorage, getStogare } from "./storageService";
const fetching = [];

export const register = async (username, password, rePassword) => {
    const usernameCheck = checkInput({ type: "username", value: username });
    const passwordCheck = checkInput({ type: "password", value: password });
    const rePasswordCheck = checkInput({ type: "rePassword", value: rePassword });

    if (usernameCheck && passwordCheck && rePasswordCheck && password === rePassword) {
        const body = new URLSearchParams();

        body.append("username", username);
        body.append("password", password);
        body.append("rePassword", rePassword);
        
        doFetch({ route: "/register", body }).then(res => {
            console.log("res\n", res);
        });
    } else {
        // !!!ERROR!!!
        console.warn(usernameCheck, passwordCheck, rePasswordCheck);
        return false;
    };
    
    // if (usernameCheck && passwordCheck && rePasswordCheck && password === rePassword) {
        /*
        const key = CryptoJS.enc.Hex.parse(process.env.REACT_APP_ENCRYPTION_KEY);
        const iv = CryptoJS.enc.Hex.parse([...Array(3)].map(() => `${new Date().getTime()}`.slice(0, 10)).join(process.env.REACT_APP_ENCRYPTION_IV));

        const options = {
            iv,
            padding: CryptoJS.pad.ZeroPadding
        }
        const encrypted = CryptoJS.AES.encrypt(password, key, options);
        const time = new Date().getTime();
        const test = [...Array(3)].map(() => `${new Date().getTime()}`.slice(0, 10)).join(process.env.REACT_APP_ENCRYPTION_IV);
        */

        /* const urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);
        
        doFetch("register", urlencoded).then(res => {
            console.log("res\n", res);
        }); */
    // };
};

export const login = async (username, password) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    return doFetch({ route: "/login", body })
        .then(res => {
            const { id, username, apiKey, user_settings, game_settings } = res;
            setStorage({ key: "apiKey", value: apiKey });
        });
};

export const changeSetting = (e) => {
    const { type, id, dataset, checked } = e.target;

    if (type === "checkbox") {
        setOption(dataset.section, id, checked);
    };

    function setOption(section, id, data) {
        if (!fetching.includes(id)) {
            fetching.push(id);

            const body = { section, id, data };
            doFetch("changeSetting", body).then(() => fetching.splice(id));
        };
    };
};

export const checkIfLogged = async () => {
    const key = getStogare("apiKey");

    if (key) {
        doFetch({ route: "/checkIfLogged" });
    };
};

async function doFetch({ route, body }) {
    const options = {
        method: body ? "POST" : "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "id": "userId",
            // "token": "userToken",
        }
    };
    const key = getStogare("apiKey");

    if (key) options.headers["apiKey"] = key;
    if (body) options["body"] = body;

    return fetch(`${process.env.REACT_APP_REST + route}`, options)
        .then(res => {
            if (res.status >= 400 && res.status < 500) {
                console.log("status", res.status);
                return res.text();
            } else {
                return res.text();
                return res.json();
            };
        })
        .catch(error => {
            // !!!ERROR!!!
            console.warn("not json", error)
            return false
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            // !!!ERROR!!!
            console.warn(error)
            return false
        });
};

function checkInput({ type, value }) {
    if (type === "username") {
        const pattern = /[a-zA-Zа-яА-Я0-9.']+/;
        const length = 3;
        // const length = 0;

        // return true;
        return check(type, length, pattern);
    };

    if (type === "password" || type === "rePassword") {
        const pattern = /[a-zA-Zа-яА-Я0-9]+/;
        const length = 6;
        // const length = 0;

        // return true;
        return check(type, length, pattern);
    };

    function check(type, length, pattern) {
        if (value.length >= length) {
            if (value.match(pattern)) {
                return true;
            } else {
                // !!!ERROR!!!
                console.warn(`${type} contians invalid chars`);
                return false;
            };
        } else {
            // !!!ERROR!!!
            console.warn(`${type} too short`);
            return false;
        };
    };
};