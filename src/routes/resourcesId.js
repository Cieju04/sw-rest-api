import { Router } from 'express'
import fetchResources from '../controllers/resourcesController';

const router = Router();

router.get('/films/', fetchResources.fetchFilms)
router.get('/species/', fetchResources.fetchSpecies)
router.get('/planets/', fetchResources.fetchPlanets)
router.get('/vehicles/', fetchResources.fetchVehicles)
router.get('/starships/', fetchResources.fetchStarships)

export default router;