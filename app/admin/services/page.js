import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import AdminSidebar from '@/components/AdminSidebar';
import DeleteServiceButton from '@/components/DeleteServiceButton';

export const metadata = { title: 'Manage Services | Shakti Admin' };
export const revalidate = 0;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { data: services } = await supabaseAdmin
    .from('services')
    .select('*')
    .order('id', { ascending: false });

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Services</h1>

        <Link href="/admin/services/add" className="btn">+ Add Service</Link>

        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services?.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td><img src={s.image_url} width="80" alt={s.title} /></td>
                  <td>{s.title}</td>
                  <td>{s.description}</td>
                  <td>
                    <DeleteServiceButton id={s.id} />
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
