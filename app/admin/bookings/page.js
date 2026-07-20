import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import AdminSidebar from '@/components/AdminSidebar';
import BookingStatusActions from '@/components/BookingStatusActions';

export const metadata = { title: 'Manage Bookings | Shakti Admin' };
export const revalidate = 0;

export default async function AdminBookingsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('id', { ascending: false });

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Bookings</h1>

        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Event</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.full_name}</td>
                  <td>{b.event_type}</td>
                  <td>{b.event_date}</td>
                  <td>{b.venue}</td>
                  <td>{b.status}</td>
                  <td>
                    <BookingStatusActions id={b.id} currentStatus={b.status} />
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
