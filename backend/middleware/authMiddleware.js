/**
 * @fileoverview Middleware to protect routes by verifying JWT.
 * @description This file contains the 'protect' function which validates a user's
 * authentication token before allowing access to a protected route.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // 1. Check if the request has an Authorization header, and if it starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract the token from the header (e.g., "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using our JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Use the ID from the token to find the user in the database.
            // We exclude the password field from being returned.
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // 5. If everything is successful, call next() to pass control to the next function (the controller)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If there's no token at all, send an error
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
