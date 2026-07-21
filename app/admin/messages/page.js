import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import AdminSidebar from '@/components/AdminSidebar';
import DeleteMessageButton from '@/components/DeleteMessageButton';

export const metadata = { title: 'Messages | Shakti Admin' };
export const revalidate = 0;

export default async function AdminMessagesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { data: messages } = await supabaseAdmin
    .from('contacts')
    .select('*')
    .order('id', { ascending: false });

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Messages</h1>

        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages?.length ? (
                messages.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.phone || '-'}</td>
                    <td>{m.subject || '-'}</td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{m.message}</td>
                    <td>{new Date(m.created_at).toLocaleString()}</td>
                    <td>
                      <DeleteMessageButton id={m.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No messages yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
