import { NextResponse } from 'next/server';
import { clearUserSession } from '@/lib/session';

export async function POST() {
  clearUserSession();
  return NextResponse.json({ success: true });
}
