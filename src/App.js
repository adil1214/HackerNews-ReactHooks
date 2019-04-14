import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from './Loader';
import logo from './logo.jpg';

const App = () => {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('react hooks');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const searchInputRef = useRef();

	useEffect(() => {
		getResults();
	}, []);

	const getResults = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
			setResults(res.data.hits);
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		getResults();
	};

	const handleClearSearch = () => {
		setQuery('');
		searchInputRef.current.focus();
	};

	return (
		<div className="container max-w-md mx-auto p-4 m-2 bg-green-dark shadow-lg rounded">
			<img src={logo} alt="Hacker News" className="float-right h-16" />
			<h1 className="text-grey-darkest font-thin">Hackernews Quick Search</h1>
			<form className="mb-5" onSubmit={handleSubmit}>
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					ref={searchInputRef}
					className="border p-1 rounded"
				/>
				<button type="submit" className="bg-red-light rounded m-1 p-1">
					Search
				</button>
				<button type="button" onClick={handleClearSearch} className="bg-grey text-white p-1 rounded">
					Clear
				</button>
			</form>
			{loading ? (
				<Loader />
			) : (
				<ul className="list-reset leading-loose">
					{results.map(result => (
						<li key={result.objectID}>
							<a
								href={result.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-indigo-darker hover:text-indigo-darkest"
							>
								{result.title}
							</a>
						</li>
					))}
				</ul>
			)}

			{error && <div className="text-red font-bold">{error.message}</div>}
		</div>
	);
};

export default App;
