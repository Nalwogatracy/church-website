import { NextResponse } from 'next/server';
import { readStore, writeStore, PrayerItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  const session = await getAdminSession();

  // If public caller, only return public prayers
  if (!session) {
    const publicPrayers = store.prayers.filter((p) => p.isPublic);
    return NextResponse.json(publicPrayers);
  }

  // Admin caller receives all prayer requests
  return NextResponse.json(store.prayers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.request) {
      return NextResponse.json({ error: 'Name and prayer request content are required' }, { status: 400 });
    }

    const store = readStore();
    const newPrayer: PrayerItem = {
      id: `pray-${Date.now()}`,
      name: body.name,
      email: body.email || '',
      request: body.request,
      isPublic: Boolean(body.isPublic),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    store.prayers.unshift(newPrayer);
    writeStore(store);
    return NextResponse.json(newPrayer, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit prayer request' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const index = store.prayers.findIndex((p) => p.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Prayer request not found' }, { status: 404 });
    }

    store.prayers[index] = { ...store.prayers[index], ...body };
    writeStore(store);
    return NextResponse.json(store.prayers[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update prayer request status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const store = readStore();
    store.prayers = store.prayers.filter((p) => p.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete prayer request' }, { status: 500 });
  }
}
