import { Router } from 'express'
import fetchResources from '../controllers/resourcesController';
import fetchFilms from '../controllers/resourcesId';

const router = Router();

router.get('/films', fetchResources.fetchFilms)
router.get('/species', fetchResources.fetchSpecies)
router.get('/planets', fetchResources.fetchPlanets)
router.get('/vehicles', fetchResources.fetchVehicles)
router.get('/starships', fetchResources.fetchStarships)

router.get('/films/:id', fetchFilms.fetchFilmsId)

export default router;