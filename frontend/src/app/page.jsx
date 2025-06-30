import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Welcome to the Reacher App</h1>
      <p>The smartest way to find your next customer.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/signup" style={{ fontSize: '20px', color: 'blue' }}>
          Sign Up
        </Link>
        <Link href="/login" style={{ fontSize: '20px', color: 'blue' }}>
          Login
        </Link>
        <Link href="/advanced-search-people" style={{ fontSize: '20px', color: 'blue' }}>
          Search People
        </Link>
        <Link href="/advanced-search-companies" style={{ fontSize: '20px', color: 'blue' }}>
          Search Companies
        </Link>
        {/* --- NEW LINK TO OFFICIAL PRICING PAGE --- */}
        <Link href="/choose-plan" style={{
            fontSize: '22px',
            color: 'white',
            backgroundColor: '#28a745',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none'
        }}>
          View Plans & Pricing
        </Link>
      </div>
    </main>
  );
}