import { NextResponse } from 'next/server';
import { readStore, writeStore, ContactMessage } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = readStore();
  return NextResponse.json(store.messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const store = readStore();
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || 'General Inquiry',
      message: body.message,
      status: 'UNREAD',
      createdAt: new Date().toISOString(),
    };

    store.messages.unshift(newMessage);
    writeStore(store);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
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
    const index = store.messages.findIndex((m) => m.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    store.messages[index] = { ...store.messages[index], ...body };
    writeStore(store);
    return NextResponse.json(store.messages[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update message status' }, { status: 500 });
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
    store.messages = store.messages.filter((m) => m.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
