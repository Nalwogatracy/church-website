import { NextResponse } from 'next/server';
import { readStore, writeStore, DonationItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = readStore();
  return NextResponse.json(store.donations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.donorName || !body.email || !body.amount) {
      return NextResponse.json({ error: 'Name, email, and amount are required' }, { status: 400 });
    }

    const store = readStore();
    const newDonation: DonationItem = {
      id: `don-${Date.now()}`,
      donorName: body.donorName,
      email: body.email,
      amount: parseFloat(body.amount),
      currency: body.currency || 'UGX',
      fund: body.fund || 'General Tithes',
      frequency: body.frequency || 'ONE_TIME',
      createdAt: new Date().toISOString(),
    };

    store.donations.unshift(newDonation);
    writeStore(store);
    return NextResponse.json(newDonation, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record donation' }, { status: 500 });
  }
}
