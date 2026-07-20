'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookingStatusActions({ id, currentStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    setLoading(true);
    try {
      await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <a
        className="approve"
        style={{ opacity: loading || currentStatus === 'Approved' ? 0.5 : 1, cursor: 'pointer' }}
        onClick={() => !loading && updateStatus('Approved')}
      >
        Approve
      </a>{' '}
      <a
        className="reject"
        style={{ opacity: loading || currentStatus === 'Rejected' ? 0.5 : 1, cursor: 'pointer' }}
        onClick={() => !loading && updateStatus('Rejected')}
      >
        Reject
      </a>
    </>
  );
}
