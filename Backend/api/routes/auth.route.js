import express from 'express';
import { signup, signin, google, verifyToken, getCurrentUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', signin);

router.post('/google', google);

router.get('/me', verifyToken, getCurrentUser);

export default router;