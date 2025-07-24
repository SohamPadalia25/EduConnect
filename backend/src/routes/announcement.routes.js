import express from 'express';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';
import { sendAnnouncement } from '../controllers/announcement.controller.js';

const router = express.Router();

// Only admin can send announcements
router.post("/send", verifyJWT, authorizeRoles("admin"), sendAnnouncement);

export default router;
