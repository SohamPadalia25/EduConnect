import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  expireOldEvents
} from '../controllers/event.controller.js';

import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 🔏 Authenticated providers can create/update/delete
router.post('/', verifyJWT, authorizeRoles('provider'), createEvent);
router.put('/:id', verifyJWT, authorizeRoles('provider', 'admin'), updateEvent);
router.delete('/:id', verifyJWT, authorizeRoles('provider', 'admin'), deleteEvent);

// Public or protected routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Optional: Trigger event expiry via route (could also use CRON)
router.patch('/expire', verifyJWT, authorizeRoles('admin'), expireOldEvents);

export default router;
