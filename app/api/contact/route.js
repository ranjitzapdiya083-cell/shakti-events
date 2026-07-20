import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('contacts').insert({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Message sending failed.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Message sending failed.' }, { status: 500 });
  }
}
