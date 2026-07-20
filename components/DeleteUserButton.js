'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteUserButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete User?')) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <a className="reject" style={{ cursor: 'pointer', opacity: loading ? 0.5 : 1 }} onClick={handleDelete}>
      Delete
    </a>
  );
}
