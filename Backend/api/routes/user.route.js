import express from 'express';
import { saveEvent, bookEvent } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/save-event', saveEvent);
router.post('/book-event', bookEvent);

export default router;
