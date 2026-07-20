'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const form = e.target;
    const payload = {
      full_name: form.full_name.value,
      email: form.email.value,
      phone: form.phone.value,
      event_type: form.event_type.value,
      event_date: form.event_date.value,
      event_time: form.event_time.value,
      venue: form.venue.value,
      guests: form.guests.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Booking Submitted Successfully!' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Book Your Event</h1>
          <p>Home / Booking</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          {status?.type === 'success' && (
            <div className="success-message">{status.message}</div>
          )}
          {status?.type === 'error' && (
            <div className="error-message">{status.message}</div>
          )}

          <form className="booking-form" onSubmit={handleSubmit}>
            <input type="text" name="full_name" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="text" name="phone" placeholder="Mobile Number" required />

            <select name="event_type" required defaultValue="">
              <option value="" disabled>Select Event</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Engagement</option>
              <option>Corporate</option>
              <option>Baby Shower</option>
              <option>Reception</option>
              <option>Anniversary</option>
              <option>Mehndi</option>
              <option>Haldi</option>
            </select>

            <input type="date" name="event_date" required />
            <input type="time" name="event_time" required />
            <input type="text" name="venue" placeholder="Venue" required />
            <input type="number" name="guests" placeholder="Guest Count" />
            <input type="text" name="budget" placeholder="Budget" />
            <textarea name="message" rows="5" placeholder="Special Requirements"></textarea>

            <button
              type="submit"
              className="btn"
              disabled={submitting}
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '30px',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {submitting ? 'Submitting...' : 'Book Your Event'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
