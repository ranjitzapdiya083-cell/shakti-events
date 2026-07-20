import { supabasePublic } from '@/lib/supabasePublic';

export const metadata = { title: 'Our Services | Shakti Events' };
export const revalidate = 0; // always fetch fresh data

export default async function ServicesPage() {
  const { data: services, error } = await supabasePublic
    .from('services')
    .select('*')
    .order('id', { ascending: false });

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Our Services</h1>
          <p>Home / Services</p>
        </div>
      </section>

      <section className="services-page">
        <div className="container">
          <div className="service-grid">
            {error && (
              <p style={{ padding: '20px' }}>
                Could not load services right now. Please try again shortly.
              </p>
            )}

            {services && services.length === 0 && (
              <p style={{ padding: '20px' }}>No services added yet.</p>
            )}

            {services?.map((s) => (
              <div className="service-card" key={s.id}>
                <img src={s.image_url} alt={s.title} />

                <div className="service-content">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <a href="/booking" className="btn" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', textDecoration: 'none' }}>
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
