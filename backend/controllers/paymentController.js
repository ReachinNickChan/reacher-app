/**
 * @fileoverview Controller for handling Stripe payment logic.
 * @description Creates Stripe Checkout sessions and handles webhook events.
 * Now handles both one-time payments and recurring subscriptions.
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/userModel');

// --- NEW: Map Price IDs to their correct mode and plan details ---
const planConfig = {
    // Trial Plan is a one-time payment
    'price_1RcNrgF8amFamxuyThJWrmwW': { mode: 'payment', planName: 'Trial Plan', credits: 50 },
    // Other plans are recurring subscriptions
    'price_1RcNs4F8amFamxuyC4gHCwN2': { mode: 'subscription', planName: 'Standard Plan', credits: 200 },
    'price_1RcNsXF8amFamxuyeV4PomZM': { mode: 'subscription', planName: 'Plus Plan', credits: 1000 },
    'price_1RcNswF8amFamxuy22z2MCHs': { mode: 'subscription', planName: 'Premium Plan', credits: 5000 },
};

// @desc    Create a Stripe Checkout Session
// @route   POST /api/payments/create-checkout-session
// @access  Protected
const createCheckoutSession = async (req, res) => {
    const { priceId } = req.body;
    const user = req.user;

    const selectedPlan = planConfig[priceId];

    // Check if the provided priceId is valid and configured
    if (!selectedPlan) {
        return res.status(400).json({ message: 'Invalid or unconfigured Price ID.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: selectedPlan.mode, // <-- Use the correct mode from our config
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            client_reference_id: user._id.toString(),
            success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/choose-plan`,
        });

        res.status(200).json({ url: session.url, sessionId: session.id });

    } catch (error) {
        console.error('Stripe Session Error:', error);
        res.status(500).json({ message: 'Failed to create checkout session.' });
    }
};

// @desc    Stripe Webhook Handler
// @route   POST /api/payments/webhook
// @access  Public
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle successful one-time payments AND subscription creations
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const userId = session.client_reference_id;
        const priceId = session.line_items?.data[0]?.price.id; // Get the priceId from the session
        
        const purchasedPlan = planConfig[priceId];

        if (userId && purchasedPlan) {
             try {
                await User.findByIdAndUpdate(userId, {
                    plan: purchasedPlan.planName,
                    $inc: { credits: purchasedPlan.credits }, // Safely increment credits
                });
                console.log(`Successfully updated plan to ${purchasedPlan.planName} for user ${userId}`);
            } catch (dbError) {
                console.error(`Database Error: Failed to update user ${userId}`, dbError);
                return res.status(500).json({ message: 'Database update failed.' });
            }
        }
    }

    res.status(200).json({ received: true });
};


module.exports = {
    createCheckoutSession,
    handleStripeWebhook,
};