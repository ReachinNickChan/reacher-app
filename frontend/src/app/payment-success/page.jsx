'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function PaymentSuccessPage() {
    const { user } = useAuth();

    // In a real application, you might use the session_id from the URL 
    // to fetch transaction details and show a more detailed summary.
    // For now, a simple confirmation is sufficient.

    return (
        <div style={{ maxWidth: '800px', margin: '100px auto', padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h1 style={{ color: '#28a745', fontSize: '2.5rem' }}>Payment Successful!</h1>
            <p style={{ fontSize: '1.2rem' }}>
                Thank you for your purchase, {user ? user.fullName : 'guest'}.
            </p>
            <p>
                Your account has been upgraded, and your credits have been added.
                You can now access your new features.
            </p>
            <div style={{ marginTop: '30px' }}>
                <Link href="/advanced-search-people" style={{
                    padding: '12px 25px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>
                    Start Searching
                </Link>
            </div>
        </div>
    );
}
