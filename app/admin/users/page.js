import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import AdminSidebar from '@/components/AdminSidebar';
import DeleteUserButton from '@/components/DeleteUserButton';

export const metadata = { title: 'Manage Users | Shakti Admin' };
export const revalidate = 0;

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { data: users } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('role', 'user')
    .order('id', { ascending: false });

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Users</h1>

        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullname}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleString() : ''}</td>
                  <td>
                    <DeleteUserButton id={u.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
