import { supabasePublic } from '@/lib/supabasePublic';

export const metadata = { title: 'Gallery | Shakti Events' };
export const revalidate = 0;

export default async function GalleryPage() {
  const { data: images, error } = await supabasePublic
    .from('gallery')
    .select('*')
    .order('id', { ascending: false });

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Gallery</h1>
          <p>Home / Gallery</p>
        </div>
      </section>

      <section className="gallery-page">
        <div className="container">
          <div className="gallery-grid">
            {error && (
              <p style={{ padding: '20px' }}>
                Could not load the gallery right now. Please try again shortly.
              </p>
            )}

            {images && images.length === 0 && (
              <p style={{ padding: '20px' }}>No images added yet.</p>
            )}

            {images?.map((g) => (
              <div className="gallery-card" key={g.id}>
                <img src={g.image_url} alt={g.title || ''} />
                <h3>{g.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
