import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import AdminSidebar from '@/components/AdminSidebar';
import DeleteGalleryButton from '@/components/DeleteGalleryButton';

export const metadata = { title: 'Manage Gallery | Shakti Admin' };
export const revalidate = 0;

export default async function AdminGalleryPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { data: images } = await supabaseAdmin
    .from('gallery')
    .select('*')
    .order('id', { ascending: false });

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Gallery</h1>

        <Link href="/admin/gallery/add" className="btn">+ Add Image</Link>

        <div className="gallery-admin">
          {images?.map((g) => (
            <div className="gallery-box" key={g.id}>
              <img src={g.image_url} alt={g.title || ''} />
              <DeleteGalleryButton id={g.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
