'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/logout', { method: 'POST' }).finally(() => {
      router.push('/');
      router.refresh();
    });
  }, [router]);

  return (
    <section className="page-banner">
      <div className="container">
        <h1>Logging out...</h1>
      </div>
    </section>
  );
}
