import { useState, useEffect, useCallback } from "react";

/**
 * A hook that handles fetch requests.
 * @param {String} url A valid url.
 * @returns [data, error, loading].
 */
const useFetch = (endpoint, body, local) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	const doFetch = useCallback(fetchData, [body, local]);

	async function fetchData(endpoint) {
		if (!endpoint) return
		setLoading(true);

		const url = `${local ? "" : process.env.REACT_APP_REST}${endpoint}`;
		const options = {
			local: {},
			https: {
				credentials: "include",
				method: "POST",
				mode: 'cors',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				}
			}
		};

		if (body) options["body"] = body;

		// console.log(url);
		return fetch(url, !local ? options : null)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setData(data);
				return data;
			})
			.catch(err => {
				setLoading(false);
				setError("err:\n", err);
			});
	};
	
	useEffect(() => {
		doFetch(endpoint);
	}, [endpoint, doFetch]);

	return [data, error, loading, fetchData];
};

export default useFetch;