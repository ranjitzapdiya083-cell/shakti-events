'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteMessageButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this message?')) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/messages/delete?id=${id}`, { method: 'DELETE' });
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
