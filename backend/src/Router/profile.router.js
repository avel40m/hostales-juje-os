import { Router } from 'express';
import { createProfile, editProfile, getProfile } from '../Controller/profile.controller.js';
import { verificarAutenticacionClient } from '../Middleware/validate.token.js';
const router = Router();

router.get("/profile",verificarAutenticacionClient,getProfile);

router.post("/profile",verificarAutenticacionClient,createProfile);

router.put("/profile",verificarAutenticacionClient,editProfile);

export default router;