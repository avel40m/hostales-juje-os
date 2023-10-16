import {Router} from 'express';
import { createOrder, receiveWebhook, success } from '../Controller/pay.controller.js';

const router = Router();

router.post('/create-order',createOrder);

router.get('/success',success);

router.get('/failure');

router.get('/pending');

router.post('/webhook',receiveWebhook);

export default router;