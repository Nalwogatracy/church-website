import { NextResponse } from 'next/server';
import { readStore, writeStore, AnnouncementItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.announcements);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: body.title || 'New Announcement',
      content: body.content || '',
      category: body.category || 'General',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      important: Boolean(body.important),
      createdAt: new Date().toISOString(),
    };

    store.announcements.unshift(newAnn);
    writeStore(store);
    return NextResponse.json(newAnn, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
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
    const index = store.announcements.findIndex((a) => a.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    store.announcements[index] = { ...store.announcements[index], ...body };
    writeStore(store);
    return NextResponse.json(store.announcements[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 });
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
    store.announcements = store.announcements.filter((a) => a.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
