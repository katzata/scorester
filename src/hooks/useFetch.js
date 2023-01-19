import { useState, useEffect } from "react";

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) return
		setLoading(true);

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setData(data)
			})
			.catch(err => {
				setLoading(false);
				setError("err:\n", err);
			});
	}, [url]);

	return [data, error, loading];
};

export default useFetch;