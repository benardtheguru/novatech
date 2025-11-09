import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { config } from 'dotenv';

config();

export default function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        // attach user role for downstream handlers
        // we fetch the user and attach role to request
        User.findById(req.userId).select('role').then(user => {
            if (user) req.userRole = user.role;
            next();
        }).catch(err => {
            console.error('Auth middleware error fetching user:', err);
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
