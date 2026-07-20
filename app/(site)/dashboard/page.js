import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const metadata = { title: 'Dashboard | Shakti Events' };

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect('/login');
  }

  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('user_id', session.id)
    .order('id', { ascending: false });

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Welcome, {session.fullname}</h1>
          <p>Home / Dashboard</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          <h2 className="section-title">Your Bookings</h2>

          <div className="booking-table">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(!bookings || bookings.length === 0) && (
                  <tr>
                    <td colSpan={4}>You haven&apos;t made any bookings yet.</td>
                  </tr>
                )}
                {bookings?.map((b) => (
                  <tr key={b.id}>
                    <td>{b.event_type}</td>
                    <td>{b.event_date}</td>
                    <td>{b.venue}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
