'use client';

import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// --- Price IDs Updated ---
// These have been updated with the values you provided.
const PLAN_PRICE_IDS = {
    trial: 'price_1RcNrgF8amFamxuyThJWrmwW',
    standard: 'price_1RcNs4F8amFamxuyC4gHCwN2',
    plus: 'price_1RcNsXF8amFamxuyeV4PomZM',
    premium: 'price_1RcNswF8amFamxuy22z2MCHs',
};

export default function StripeTestPage() {
    const { token, user } = useAuth();

    const handleCheckout = async (priceId) => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        if (priceId.includes('REPLACE_WITH')) {
            alert('A placeholder Price ID is still being used. Please contact your developer.');
            return;
        }

        try {
            // Set up the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Call our backend to create the checkout session
            const response = await axios.post(
                'http://localhost:5000/api/payments/create-checkout-session',
                { priceId }, // Send the selected priceId in the request body
                config
            );

            // If successful, redirect the user to the Stripe Checkout page
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Failed to create checkout session', error);
            alert('Error creating checkout session. Check the console for details.');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1>Stripe Integration Test</h1>
            {user ? (
                <div>
                    <p>Logged in as: <strong>{user.email}</strong></p>
                    <p>Select a plan to test the checkout process.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
                        {/* New Button for Trial Plan */}
                        <button onClick={() => handleCheckout(PLAN_PRICE_IDS.trial)} style={{ padding: '15px 25px', fontSize: '18px', backgroundColor: '#f0f0f0' }}>Test Trial Plan</button>
                        <button onClick={() => handleCheckout(PLAN_PRICE_IDS.standard)} style={{ padding: '15px 25px', fontSize: '18px' }}>Test Standard Plan</button>
                        <button onClick={() => handleCheckout(PLAN_PRICE_IDS.plus)} style={{ padding: '15px 25px', fontSize: '18px' }}>Test Plus Plan</button>
                        <button onClick={() => handleCheckout(PLAN_PRICE_IDS.premium)} style={{ padding: '15px 25px', fontSize: '18px' }}>Test Premium Plan</button>
                    </div>
                </div>
            ) : (
                <p style={{ color: 'red' }}>Please log in to use this test page.</p>
            )}
        </div>
    );
}
