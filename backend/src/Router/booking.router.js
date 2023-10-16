import {Router} from 'express';
import { verificarAutenticacionClient } from '../Middleware/validate.token.js';
import { createBookings, getBookings, getBookingsPays, myBookings } from '../Controller/bookings.controller.js';
const router = Router();

router.post('/booking/:idHostal/hostal',verificarAutenticacionClient,createBookings);

router.get('/booking',verificarAutenticacionClient,myBookings);

router.get('/booking/hostal',getBookings);

router.get('/booking/:id/pay',getBookingsPays);

export default router;