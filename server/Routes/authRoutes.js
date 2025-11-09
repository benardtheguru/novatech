import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// GET route for signup page
router.get('/signup', (req, res) => {
    res.json({ 
        message: "Signup Form", 
        instructions: "Send a POST request to this endpoint with name, email, and password in the body"
    });
});

// POST routes for authentication
router.post('/signup', signup);
router.post('/login', login);

export default router;