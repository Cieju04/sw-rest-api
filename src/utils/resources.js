import fetch from 'node-fetch';

export async function fetchName () {
	const fetchData = await fetch(`https://swapi.dev/api/people/${Math.floor(Math.random() * (83 - 1)) + 1}/`)
		.then(res => res.json())
		.catch(err => console.log(err))
		return fetchData

}