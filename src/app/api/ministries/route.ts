import { NextResponse } from 'next/server';
import { readStore, writeStore, MinistryItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.ministries);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const newMinistry: MinistryItem = {
      id: `min-${Date.now()}`,
      name: body.name || 'New Ministry',
      slug: (body.name || 'new-ministry').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: body.description || '',
      leaderName: body.leaderName || '',
      meetingTime: body.meetingTime || '',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      icon: body.icon || 'Heart',
      createdAt: new Date().toISOString(),
    };

    store.ministries.push(newMinistry);
    writeStore(store);
    return NextResponse.json(newMinistry, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create ministry' }, { status: 500 });
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
    const index = store.ministries.findIndex((m) => m.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Ministry not found' }, { status: 404 });
    }

    store.ministries[index] = { ...store.ministries[index], ...body };
    writeStore(store);
    return NextResponse.json(store.ministries[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update ministry' }, { status: 500 });
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
    store.ministries = store.ministries.filter((m) => m.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete ministry' }, { status: 500 });
  }
}
