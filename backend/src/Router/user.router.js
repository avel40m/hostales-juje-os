import {Router} from 'express';
import { getAllUser, getUser, loginUser, registerUser } from '../Controller/user.controller.js';
import { validateToken, verificarAutenticacionAuth } from '../Middleware/validate.token.js';

const router = Router();

router.post('/register',registerUser);

router.post('/login', loginUser);

router.get('/users',verificarAutenticacionAuth,getAllUser);
router.get('/user',getUser);

router.get('/verify-token',validateToken);

export default router;