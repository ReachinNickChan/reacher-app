/**
 * @fileoverview The main entry point for the Reacher App backend server.
 * @description This file initializes the Express server, connects to the MongoDB
 * database, and sets up all middleware and API routes.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// --- Import Route Files ---
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // <-- Import payment routes

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());

// --- SPECIAL ROUTE FOR STRIPE WEBHOOK ---
// The Stripe webhook needs the raw request body, so we apply its route 
// BEFORE the global express.json() middleware.
app.use('/api/payments/webhook', express.raw({type: 'application/json'}), paymentRoutes);

// --- GLOBAL MIDDLEWARE ---
// This will apply to all other routes
app.use(express.json());

// --- API ROUTES ---
app.get('/', (req, res) => {
    res.send('Reacher App Backend is running!');
});

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/people', peopleRoutes);
// We only need the checkout session route from here now.
app.use('/api/payments', paymentRoutes);

// --- DB Connection and Server Start ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    });
