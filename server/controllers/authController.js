import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import User from '../models/user.js';

export const signup = async (req, res) => {
    try {
        console.log('Received signup request:', req.body);
        
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        console.log('Checking for existing user with email:', email);
        const existing = await User.findOne({ email });
        if (existing) {
            console.log('User already exists with this email');
            return res.status(400).json({ msg: "User already exists" });
        }

        console.log('Hashing password...');
        const hashed = await bcrypt.hash(password, 10);
        
        console.log('Creating new user document...');
        // Only allow 'admin' role if explicitly passed; default to 'user'
        const userRole = role === 'admin' ? 'admin' : 'user';
        const userData = { name, email, password: hashed, role: userRole };
        // generate loginId for admin users
        if (userRole === 'admin') {
            userData.loginId = randomUUID();
        }
        const user = new User(userData);
        
        console.log('Saving user to database...');
        await user.save();
        console.log('User saved successfully:', user._id);

        console.log('Generating JWT token...');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Signup successful');
        res.status(201).json({ 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role, loginId: user.loginId }
        });
    } catch (error) {
        console.error('Signup error:', error);
        console.error('Full error details:', JSON.stringify(error, null, 2));
        res.status(500).json({ msg: "Server error", details: error.message });
    }
};
    
 export const login = async (req, res) => {
    try {
        const { email, password, loginId } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // If loginId provided, ensure it matches the user's loginId (admin unique page)
        if (loginId) {
            if (!user.loginId || user.loginId !== loginId) {
                return res.status(400).json({ msg: "Invalid admin login ID" });
            }
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Create and send token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: "Server error" });
    }
};



