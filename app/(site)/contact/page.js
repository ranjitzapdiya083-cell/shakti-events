'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Your message sent successfully!' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: data.error || 'Message sending failed.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Message sending failed.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Home / Contact</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>We are ready to make your event memorable. Contact Shakti Events today.</p>

              <h4>📞 Phone</h4>
              <p>+91 9725366257</p>

              <h4>📧 Email</h4>
              <p>ranjitzapdiya083@gmail.com</p>

              <h4>📍 Location</h4>
              <p>Jasdan, Rajkot, Gujarat</p>

              <div className="social-links">
                <a href="https://wa.me/917016073709" target="_blank" rel="noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com/shakti._.events._" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="contact-form">
              {status?.type === 'success' && (
                <p className="success-message">{status.message}</p>
              )}
              {status?.type === 'error' && (
                <p className="error-message">{status.message}</p>
              )}

              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <input type="text" name="phone" placeholder="Mobile Number" />
                <input type="text" name="subject" placeholder="Subject" />
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>

                <button className="btn" type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
