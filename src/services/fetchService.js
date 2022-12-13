export const fetchHttp = (url, options = {}) => {
    return fetch(url, options)
        .then(res => res.json())
        .catch(error => console.warn({type: "json", error}))
        .then(res => res)
        .catch(err => console.warn(err));
};

// export const fetchData = (url, options = {}) => {
//     return fetch(url, options)
//         .then(res => res.json())
//         .catch(error => console.warn({type: "json", error}))
//         .then(res => res)
//         .catch(err => console.warn(err));
// };