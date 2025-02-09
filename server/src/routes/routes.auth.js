import express from 'express';
import { registerUser, loginUser } from '../controller/controller.auth.js';
import { check } from 'express-validator';
import authMiddleware from '../middleware/authmiddleware.js';
import cookieParser from 'cookie-parser';

const router = express.Router();

// Add cookie parser middleware
router.use(cookieParser());

router.get('/', (req, res) => {
    res.send('API is running...');
});

// Register Route
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], registerUser);

// Login Route with cookie
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], loginUser);

// Profile Route with cookie verification
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to your profile', userId: req.user });
});

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

export default router;
