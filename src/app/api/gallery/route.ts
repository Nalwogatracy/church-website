import { NextResponse } from 'next/server';
import { readStore, writeStore, GalleryItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.gallery);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: body.title || 'Church Event',
      category: body.category || 'Worship',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString(),
    };

    store.gallery.unshift(newItem);
    writeStore(store);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
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
    store.gallery = store.gallery.filter((g) => g.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
