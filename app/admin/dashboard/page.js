import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = { title: 'Admin Dashboard | Shakti Events' };

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [{ count: total_users }, { count: total_bookings }, { count: pending_bookings }, { count: total_messages }] =
    await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).eq('role', 'user'),
      supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'Pending'),
      supabaseAdmin.from('contacts').select('*', { count: 'exact', head: true }),
    ]);

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Welcome {session.fullname}</h1>

        <div className="dashboard-cards">
          <div className="admin-card">
            <h3>Total Users</h3>
            <p>{total_users ?? 0}</p>
          </div>

          <div className="admin-card">
            <h3>Total Bookings</h3>
            <p>{total_bookings ?? 0}</p>
          </div>

          <div className="admin-card">
            <h3>Pending</h3>
            <p>{pending_bookings ?? 0}</p>
          </div>

          <div className="admin-card">
            <h3>Messages</h3>
            <p>{total_messages ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
