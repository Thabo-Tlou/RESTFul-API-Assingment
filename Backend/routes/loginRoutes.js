import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// POST route for Login
router.post('/login', login);

export default router;
