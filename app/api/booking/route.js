import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getUserSession } from '@/lib/session';

export async function POST(request) {
  try {
    const body = await request.json();
    const session = await getUserSession();

    const {
      full_name,
      email,
      phone,
      event_type,
      event_date,
      event_time,
      venue,
      guests,
      budget,
      message,
    } = body;

    if (!full_name || !email || !phone || !event_type || !event_date || !event_time || !venue) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('bookings').insert({
      user_id: session?.id || null,
      full_name,
      email,
      phone,
      event_type,
      event_date,
      event_time,
      venue,
      guests: guests ? parseInt(guests, 10) : null,
      budget: budget || null,
      message: message || null,
      status: 'Pending',
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
