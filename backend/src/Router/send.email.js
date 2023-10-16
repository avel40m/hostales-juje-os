import { Router } from "express";
import { sendEmail } from "../Controller/email.controller.js";

const router = Router();

router.post('/sendemail',sendEmail)

export default router;