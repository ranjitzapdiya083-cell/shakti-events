'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const form = e.target;
    const payload = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      confirm_password: form.confirm_password.value,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Registration Successful. Redirecting to login...' });
        setTimeout(() => router.push('/login'), 1200);
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Create Account</h1>
          <p style={{ backgroundColor: '#666' }}>Register</p>
        </div>
      </section>

      <section className="auth-section">
        <div className="auth-box">
          {status?.type === 'success' && (
            <div className="success-message">{status.message}</div>
          )}
          {status?.type === 'error' && (
            <div className="error-message">{status.message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <input type="text" name="fullname" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="phone" placeholder="Mobile Number" required />
            <input type="password" name="password" placeholder="Password" required minLength={6} />
            <input type="password" name="confirm_password" placeholder="Confirm Password" required />

            <button className="btn" name="register" disabled={submitting}>
              {submitting ? 'Please wait...' : 'Register'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
