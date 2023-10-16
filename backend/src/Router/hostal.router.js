import {Router} from 'express';
import { createHostal, detailsHostal, getHostal, getHostalMenu, getHostalMenuDetails } from '../Controller/hostal.controller.js';
const router = Router();

router.post('/hostal',createHostal);

router.get("/hostal",getHostal);

router.get("/hostal/:id",detailsHostal);

router.get("/menu/hostal",getHostalMenu);

router.get("/menu/:id/details",getHostalMenuDetails);

export default router;