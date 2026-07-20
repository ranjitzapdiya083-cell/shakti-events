'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header({ session }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            Shakti<span>Events</span>
          </Link>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <ul className={open ? 'open' : ''}>
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="/services" onClick={() => setOpen(false)}>Services</Link></li>
            <li><Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link></li>
            <li><Link href="/booking" onClick={() => setOpen(false)}>Book Event</Link></li>
            <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

            {!session && (
              <li><Link href="/register" onClick={() => setOpen(false)}>Register</Link></li>
            )}
            <li><Link href="/admin/login" onClick={() => setOpen(false)}>Admin</Link></li>

            {session ? (
              <>
                <li><Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
                <li><Link href="/logout" onClick={() => setOpen(false)}>Logout</Link></li>
              </>
            ) : (
              <li><Link href="/login" onClick={() => setOpen(false)}>Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
