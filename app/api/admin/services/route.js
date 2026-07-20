import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const BUCKET = 'services';

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const file = formData.get('image');

    if (!title || !file) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fileName, arrayBuffer, { contentType: file.type });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName);

    const { error: insertError } = await supabaseAdmin.from('services').insert({
      title,
      description: description || null,
      image_url: publicUrlData.publicUrl,
    });

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
