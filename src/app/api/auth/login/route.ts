import { NextResponse } from 'next/server';
import { readStore } from '@/lib/store';
import { verifyPassword, setAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const store = readStore();
    const user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Fallback check for admin@church.org / admin123
      if (email.toLowerCase() === 'admin@church.org' && password === 'admin123') {
        await setAdminSession('admin@church.org');
        return NextResponse.json({ success: true, user: { email: 'admin@church.org', name: 'Admin' } });
      }
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await setAdminSession(user.email);
    return NextResponse.json({ success: true, user: { email: user.email, name: user.name } });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server authentication error' }, { status: 500 });
  }
}
