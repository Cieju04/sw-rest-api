import { User } from '../models/user';
import fetch from 'node-fetch';

export default {

  async fetchFilmsId(req, res) {

    try {

      const url = await User.findById(req.user.id).exec();
      const urlHelper = url.swUrl.split('/');
      const urlNumber = urlHelper[urlHelper.length - 2]

      const characterFilms = [];

      const paramId = req.params.id
      
      if (paramId) {
        const fetchData = await fetch(`https://swapi.dev/api/people/${urlNumber}/`)
          .then(data => data.json())
          .then(data => data.films)

        const regex = new RegExp(paramId, "g")

        const atLeastOneMatches = fetchData.some(e => regex.test(e));

        if (atLeastOneMatches) {
          const fetchApi = await fetch(`https://swapi.dev/api/films/${paramId}/`)
          .then(data => data.json())
          characterFilms.push(fetchApi)
          res.send(characterFilms.flat());
        } else {
          res.status(400).json({
            message: "Sorry, no films for your character",
          })
        }
      }
    } catch (e) {
			res.status(500).json({
				message: "Fatal error, please try again later",
			})
		}
  }
}