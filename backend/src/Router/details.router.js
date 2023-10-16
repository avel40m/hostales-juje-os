import {Router} from 'express';
import { createDetails } from '../Controller/details.controller.js';
const router = Router();

router.post('/details/:idHostal/hostal',createDetails);

export default router;