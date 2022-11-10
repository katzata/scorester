const fetching = [];

export const register = async (username, password, rePassword) => {
    console.log("x", process.env);
    console.log(username, password, rePassword);

    return doFetch("register")
    // return fetch(process.env.REACT_APP_REST, options)
        // .then(res => console.log(res))
        // .catch(err => console.log(err));
};

export const login = async (username, password) => {
    console.log("x", process.env);
    console.log(username, password);
    const options = {
        // method: "GET',
        // headers: {
        //   'Accept': 'image/jpeg',
        // },
        // mode: 'cors',
        // cache: 'default',
    };
    // return fetch(process.env.REACT_APP_REST, options)
        // .then(res => console.log(res))
        // .catch(err => console.log(err));
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

function checkInput({ type, value }) {
    if (type === "username") {
        if (value.length < 3) {
            // !!!ERROR!!!
            console.log("username too short");
        }
    }
}

async function doFetch(section, body) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "id": "userId",
            "token": "userToken",
        },
        body: JSON.stringify(body)
    };

    return fetch(`${process.env.REACT_APP_REST}/${section}`, options)
        .then(res => res.json())
        .catch(error => console.warn("x", error))
        .then(res => {
            // console.log(res);
            return res;
        })
        .catch(error => console.warn(error));
};