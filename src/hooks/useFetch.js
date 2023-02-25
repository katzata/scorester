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

	/**
	 * Does a fetch request.
	 * Empty string to tests the root url.
	 * Expected root result: json { res: 'yay' }
	 * @param {String} endpoint A valid url endpoint.
	 */
	const fetchData = useCallback((endpoint, fetchBody, fetchLocal) => {
		if (!endpoint && typeof endpoint !== "string") {
			return JSON.stringify({ res: "Bad request" });
		};

		setLoading(true);

		const searchParams = new URLSearchParams(fetchBody);
		const url = `${fetchLocal ? "" : process.env.REACT_APP_REST}${endpoint}`;
		const options = {
			credentials: "include",
			method: "POST",
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			}
		};

		if (fetchBody) options["body"] = searchParams;

		return fetch(url, !fetchLocal ? options : null)
			.then((res) => res.json())
			.catch(err => {
				setLoading(false);
				setError(err);
			})
			.then((data) => {
				setLoading(false);
				setData(data);
				return data;
			});
	}, []);

	useEffect(() => {
		fetchData(endpoint, body, local);
	}, [endpoint, body, local, fetchData]);

	return [data, error, loading, fetchData];
};

export default useFetch;