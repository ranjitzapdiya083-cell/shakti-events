'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.target;
    const payload = { email: form.email.value, password: form.password.value };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Login</h1>
        </div>
      </section>

      <section className="auth-section">
        <div className="auth-box">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />

            <button className="btn" name="login" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
