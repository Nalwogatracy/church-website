import { NextResponse } from 'next/server';
import { readStore, writeStore, SermonItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.sermons);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const newSermon: SermonItem = {
      id: `sermon-${Date.now()}`,
      title: body.title || 'New Sermon',
      speaker: body.speaker || 'Pastor David Miller',
      series: body.series || 'Sunday Teaching',
      scripture: body.scripture || '',
      sermonDate: body.sermonDate || new Date().toISOString().split('T')[0],
      videoUrl: body.videoUrl || '',
      audioUrl: body.audioUrl || '',
      description: body.description || '',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      createdAt: new Date().toISOString(),
    };

    store.sermons.unshift(newSermon);
    writeStore(store);
    return NextResponse.json(newSermon, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create sermon' }, { status: 500 });
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
    const index = store.sermons.findIndex((s) => s.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Sermon not found' }, { status: 404 });
    }

    store.sermons[index] = { ...store.sermons[index], ...body };
    writeStore(store);
    return NextResponse.json(store.sermons[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update sermon' }, { status: 500 });
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
    store.sermons = store.sermons.filter((s) => s.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete sermon' }, { status: 500 });
  }
}
