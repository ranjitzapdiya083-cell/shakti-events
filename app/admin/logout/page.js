'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/logout', { method: 'POST' }).finally(() => {
      router.push('/admin/login');
      router.refresh();
    });
  }, [router]);

  return (
    <div className="auth-box" style={{ margin: '80px auto' }}>
      <h2>Logging out...</h2>
    </div>
  );
}
