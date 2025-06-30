/**
 * @fileoverview Defines the API routes for payment processing.
 */

const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleStripeWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// This route is for our frontend to call. It must be protected so we know which user is asking.
router.post('/create-checkout-session', protect, createCheckoutSession);

// This route is for Stripe to call. It CANNOT be protected.
// It also needs a special middleware to handle the raw request body from Stripe.
// We will add this special middleware in the main index.js file.
router.post('/webhook', handleStripeWebhook);

module.exports = router;
