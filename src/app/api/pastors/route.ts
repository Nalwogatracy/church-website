import { NextResponse } from 'next/server';
import { readStore, writeStore, PastorItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.pastors);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const newPastor: PastorItem = {
      id: `pastor-${Date.now()}`,
      name: body.name || 'Pastor Name',
      title: body.title || 'Associate Pastor',
      bio: body.bio || '',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      email: body.email || '',
      order: body.order || store.pastors.length + 1,
      createdAt: new Date().toISOString(),
    };

    store.pastors.push(newPastor);
    writeStore(store);
    return NextResponse.json(newPastor, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create pastor profile' }, { status: 500 });
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
    const index = store.pastors.findIndex((p) => p.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Pastor not found' }, { status: 404 });
    }

    store.pastors[index] = { ...store.pastors[index], ...body };
    writeStore(store);
    return NextResponse.json(store.pastors[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update pastor profile' }, { status: 500 });
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
    store.pastors = store.pastors.filter((p) => p.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete pastor' }, { status: 500 });
  }
}
