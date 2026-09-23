import { NextResponse } from 'next/server';
import { readStore, writeStore, SponsorItem } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const store = readStore();
  const session = await getAdminSession();

  // If public request, return partnered / approved sponsors only
  if (!session) {
    const publicSponsors = store.sponsors.filter((s) => s.status !== 'PENDING');
    return NextResponse.json(publicSponsors);
  }

  // Admin caller receives all sponsor applications
  return NextResponse.json(store.sponsors);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.projectChoice) {
      return NextResponse.json({ error: 'Name, email, and project selection are required' }, { status: 400 });
    }

    const store = readStore();
    const newSponsor: SponsorItem = {
      id: `sp-${Date.now()}`,
      name: body.name,
      organization: body.organization || '',
      email: body.email,
      phone: body.phone || '',
      projectChoice: body.projectChoice,
      contributionType: body.contributionType || 'FINANCIAL',
      amountEstimate: body.amountEstimate ? parseFloat(body.amountEstimate) : undefined,
      currency: body.currency || 'UGX',
      message: body.message || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    store.sponsors.unshift(newSponsor);
    writeStore(store);
    return NextResponse.json(newSponsor, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record sponsorship application' }, { status: 500 });
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
    const index = store.sponsors.findIndex((s) => s.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Sponsor record not found' }, { status: 404 });
    }

    store.sponsors[index] = { ...store.sponsors[index], ...body };
    writeStore(store);
    return NextResponse.json(store.sponsors[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update sponsor status' }, { status: 500 });
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
    store.sponsors = store.sponsors.filter((s) => s.id !== id);
    writeStore(store);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete sponsor record' }, { status: 500 });
  }
}
