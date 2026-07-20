import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function DELETE(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('services').delete().eq('id', id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
