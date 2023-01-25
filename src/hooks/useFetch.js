import { useState, useEffect, useCallback } from "react";

/**
 * A hook that handles fetch requests.
 * @param {String} endpoint A valid url endpoint.
 * @param {Object} body An object that will be appended as a request body if present.
 * @param {Boolean} local Indicates if the request is local and if so the base request path will not be applyed.
 * @returns [data, error, loading, fetchData].
 */
const useFetch = (endpoint, body, local) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	const doFetch = useCallback(fetchData, [body, local]);

	async function fetchData(endpoint) {
		if (!endpoint) return "Bad request";
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