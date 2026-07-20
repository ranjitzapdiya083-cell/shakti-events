import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const { fullname, email, phone, password, confirm_password } = await request.json();

    if (!fullname || !email || !phone || !password) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 });
    }

    if (password !== confirm_password) {
      return NextResponse.json({ error: 'Password not matched' }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { error } = await supabaseAdmin.from('users').insert({
      fullname,
      email,
      phone,
      password: hashed,
      role: 'user',
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
