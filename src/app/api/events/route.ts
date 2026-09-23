import { NextResponse } from 'next/server';
import { readStore, writeStore, EventItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.events);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const store = readStore();
    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title: body.title || 'New Event',
      description: body.description || '',
      eventDate: body.eventDate || new Date().toISOString().split('T')[0],
      startTime: body.startTime || '09:00 AM',
      endTime: body.endTime || '11:00 AM',
      location: body.location || 'Main Sanctuary',
      category: body.category || 'Worship Service',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
      featured: Boolean(body.featured),
      createdAt: new Date().toISOString(),
    };

    store.events.unshift(newEvent);
    writeStore(store);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
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
    const index = store.events.findIndex((e) => e.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    store.events[index] = { ...store.events[index], ...body };
    writeStore(store);
    return NextResponse.json(store.events[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
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
    store.events = store.events.filter((e) => e.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
