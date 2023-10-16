import {Router} from 'express';
import { verificarAutenticacionClient } from '../Middleware/validate.token.js';
import { createComment, getCommentsForHostals } from '../Controller/comment.controller.js';
const router = Router();

router.post('/comment',verificarAutenticacionClient,createComment);

router.get('/comment/hostal',getCommentsForHostals);

export default router;