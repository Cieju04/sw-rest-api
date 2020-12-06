import { User } from '../models/user';
import fetch from 'node-fetch';
import { getAsync } from '../server';
import { setAsync } from '../server';

export default {
	async fetchFilms(req, res) {
		try {
			const url = await User.findById(req.user.id).exec();
			const urlHelper = url.swUrl.split('/');
			const urlNumber = urlHelper[urlHelper.length - 2]

			const characterFilms = [];

				const reply = await getAsync(`cacheFilms${req.user.id}`)
			if (reply) {
				console.log('Using cacheFilms from cache server');
				characterFilms.push(JSON.parse(reply))
				res.send(characterFilms.flat());
				return
			}

			const fetchData = await fetch(`https://swapi.dev/api/people/${urlNumber}/`)
				.then(data => data.json())
				.then(data => data.films)

			for (const data of fetchData) {
				const singleFetch = await fetch(data)
				const singleJson = await singleFetch.json()
				characterFilms.push(singleJson)
			}
			const saveUrl = await setAsync(`cacheFilms${req.user.id}`, JSON.stringify(characterFilms), 'EX', process.env.CACHE_TIME)

			res.status(200).json(characterFilms)
		} catch (e) {
			res.status(500).json({
				message: "Courage is now your only hope",
			})
		}
	},

	async fetchSpecies(req, res) {
		try {
			const url = await User.findById(req.user.id).exec();
			const urlHelper = url.swUrl.split('/');
			const urlNumber = urlHelper[urlHelper.length - 2]

			const reply = await getAsync(`cacheSpiecies${req.user.id}`);
			if (reply) {
				const cacheSpiecies = [JSON.parse(reply)]
				console.log('Using cacheSpiecies from cache server');
				res.send(cacheSpiecies.flat());
				return
			}

			const fetchData = await fetch(`https://swapi.dev/api/people/${urlNumber}/`)
				.then(data => data.json())
				.then(data => data.species)

			if (fetchData.length < 1) {
				res.status(400).json({
					message: "There are no species for this character",
				})
				return
			}

			const characterSpecies = await fetch(fetchData).then(data => data.json())

			const saveUrl = await setAsync(`cacheSpiecies${req.user.id}`, JSON.stringify(characterSpecies), 'EX', process.env.CACHE_TIME)

			res.status(200).json(characterSpecies)
		} catch (e) {
			res.status(500).json({
				message: "something went terribly wrong",
			})
		}
	},

	async fetchVehicles(req, res) {
		try {
			const url = await User.findById(req.user.id).exec();
			const urlHelper = url.swUrl.split('/');
			const urlNumber = urlHelper[urlHelper.length - 2]

			const characterVehicles = [];

			const reply = await getAsync(`cacheVehicles${req.user.id}`)
			if (reply) {
				console.log('Using cacheVehicles from cache server');
				characterVehicles.push(JSON.parse(reply))
				res.send(characterVehicles.flat());
				return
			}

			const fetchData = await fetch(`https://swapi.dev/api/people/${urlNumber}/`)
				.then(data => data.json())
				.then(data => data.vehicles)

			if (fetchData.length < 1) {
				res.status(400).json({
					message: "There are no vehicles for this character",
				})
				return
			}

			for (const data of fetchData) {
				const singleFetch = await fetch(data)
				const singleJson = await singleFetch.json()
				characterVehicles.push(singleJson)
			}

			const saveUrl = await setAsync(`cacheVehicles${req.user.id}`, JSON.stringify(characterVehicles), 'EX', process.env.CACHE_TIME)

			res.status(200).json(characterVehicles)

		} catch (e) {
			res.status(500).json({
				message: "something went terribly wrong",
			})
		}
	},

	async fetchStarships(req, res) {
		try {
			const url = await User.findById(req.user.id).exec();
			const urlHelper = url.swUrl.split('/');
			const urlNumber = urlHelper[urlHelper.length - 2]

			const characterStarships = [];

			const reply = await getAsync(`cacheStarships${req.user.id}`)
			if (reply) {
				console.log('Using cacheVehicles from cache server');
				characterStarships.push(JSON.parse(reply))
				res.send(characterStarships.flat());
				return
			}

			const fetchData = await fetch(`https://swapi.dev/api/people/${urlNumber}/`)
				.then(data => data.json())
				.then(data => data.starships)

			if (fetchData.length < 1) {
				res.status(400).json({
					message: "There are no starships for this character",
				})
				return
			}

			for (const data of fetchData) {
				const singleFetch = await fetch(data)
				const singleJson = await singleFetch.json()
				characterStarships.push(singleJson)
			}

			const saveUrl = await setAsync(`cacheStarships${req.user.id}`, JSON.stringify(characterStarships), 'EX', process.env.CACHE_TIME)

			res.status(200).json(characterStarships)

		} catch (e) {
			res.status(500).json({
				message: "Lord, have mercy on us",
			})
		}
	},

	async fetchPlanets(req, res) {
		try {
			const url = await User.findById(req.user.id).exec();
			const urlHelper = url.swUrl.split('/');
			const urlNumber = urlHelper[urlHelper.length - 2]

			const reply = await getAsync(`cachePlanets${req.user.id}`);
			if (reply) {
				const cachePlanets = [JSON.parse(reply)]
				console.log('Using cacheSpiecies from cache server');
				res.send(cachePlanets);
				return
			}

			const fetchData = await fetch(`https://swapi.dev/api/people/${urlNumber}/`)
				.then(data => data.json())
				.then(data => data.homeworld)

			if (fetchData.length < 1) {
				res.status(400).json({
					message: "There are no species for this character",
				})
				return
			}

			const characterPlanets = await fetch(fetchData).then(data => data.json())

			const saveUrl = await setAsync(`cachePlanets${req.user.id}`, JSON.stringify(characterPlanets), 'EX', process.env.CACHE_TIME)

			res.status(200).json([characterPlanets])

		} catch (e) {
			res.status(500).json({
				message: "Jesuc Christ, we're all going to die",
			})
		}
	}
}
