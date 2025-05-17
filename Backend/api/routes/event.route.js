// routes/event.route.js
import express from 'express';
import { getAllEvents, getSingleEvent, createEvent, deleteEvent, updateEvent } from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', getAllEvents); 
router.get('/:id', getSingleEvent);     
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);
export default router;
