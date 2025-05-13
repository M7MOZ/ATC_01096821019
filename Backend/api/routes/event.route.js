// routes/event.route.js
import express from 'express';
import { getAllEvents, getSingleEvent, createEvent } from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', getAllEvents); 
router.get('/:id', getSingleEvent);     
router.post('/', createEvent);

export default router;
