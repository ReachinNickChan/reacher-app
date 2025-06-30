'use client';

import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

// Plan details, including the Price IDs from your Stripe Dashboard.
const plans = [
    {
        name: 'Trial Plan',
        price: '$10.00',
        frequency: 'one-time',
        description: 'A great way to test the waters with a starter set of credits.',
        features: ['50 Search Credits', 'Email Support'],
        priceId: 'price_1RcNrgF8amFamxuyThJWrmwW',
    },
    {
        name: 'Standard Plan',
        price: '$100.00',
        frequency: 'per year',
        description: 'Perfect for individuals and small teams getting started.',
        features: ['200 Search Credits/Month', 'Standard Company & People Search', 'Email Support'],
        priceId: 'price_1RcNs4F8amFamxuyC4gHCwN2',
    },
    {
        name: 'Plus Plan',
        price: '$250.00',
        frequency: 'per year',
        description: 'For growing teams that need more power and credits.',
        features: ['1000 Search Credits/Month', 'Advanced Search Filters', 'Priority Email Support'],
        priceId: 'price_1RcNsXF8amFamxuyeV4PomZM',
    },
    {
        name: 'Premium Plan',
        price: '$800.00',
        frequency: 'per year',
        description: 'The ultimate package for power users and enterprises.',
        features: ['5000 Search Credits/Month', 'Full API Access', 'Dedicated Account Manager'],
        priceId: 'price_1RcNswF8amFamxuy22z2MCHs',
    },
];

// Reusable component for displaying a single pricing plan
const PricingCard = ({ plan, onSelect, user }) => (
    <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>{plan.name}</h2>
            <p style={{ fontSize: '2rem', margin: '0', fontWeight: 'bold' }}>{plan.price}</p>
            <p style={{ color: '#666', marginTop: '5px' }}>{plan.frequency}</p>
            <p style={{ marginTop: '15px', minHeight: '60px' }}>{plan.description}</p>
            <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
                {plan.features.map(feature => <li key={feature} style={{ marginBottom: '10px' }}>✓ {feature}</li>)}
            </ul>
        </div>
        <button
            onClick={() => onSelect(plan.priceId)}
            disabled={!user}
            style={{
                padding: '10px 20px',
                cursor: !user ? 'not-allowed' : 'pointer',
                backgroundColor: !user ? '#ccc' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px'
            }}
        >
            {plan.name === 'Trial Plan' ? 'Purchase Trial' : 'Subscribe'}
        </button>
    </div>
);


export default function ChoosePlanPage() {
    const { token, user } = useAuth();
    const router = useRouter();

    const handleCheckout = async (priceId) => {
        if (!user) {
            alert('Please log in or sign up to choose a plan!');
            router.push('/login');
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(
                'http://localhost:5000/api/payments/create-checkout-session',
                { priceId },
                config
            );
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Failed to create checkout session', error);
            alert('Error creating checkout session. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1>Choose Your Plan</h1>
            <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px' }}>
                Simple, transparent pricing. No hidden fees.
            </p>
            {!user && <p style={{color: 'red', fontWeight: 'bold'}}>You must be logged in to select a plan.</p>}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                {plans.map(plan => (
                    <PricingCard key={plan.name} plan={plan} onSelect={handleCheckout} user={user} />
                ))}
            </div>
        </div>
    );
}

