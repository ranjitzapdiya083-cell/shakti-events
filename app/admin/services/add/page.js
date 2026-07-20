'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddServicePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.target;
    const formData = new FormData();
    formData.append('title', form.title.value);
    formData.append('description', form.description.value);
    formData.append('image', form.image.files[0]);

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/admin/services');
        router.refresh();
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-box" style={{ margin: '80px auto' }}>
      <h2>Add Service</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Service Title" required />
        <textarea name="description" placeholder="Description"></textarea>
        <input type="file" name="image" accept="image/*" required />

        <button className="btn" name="add" disabled={submitting}>
          {submitting ? 'Uploading...' : 'Add Service'}
        </button>
      </form>
    </div>
  );
}
