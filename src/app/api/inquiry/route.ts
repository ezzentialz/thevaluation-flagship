import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_LEN = 4000;
const hits = new Map<string, number[]>();

// Light per-IP throttle (best effort; serverless instances do not share memory).
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const subject = String(body.subject ?? '').slice(0, 200).trim();
  const message = String(body.message ?? '').slice(0, MAX_LEN).trim();
  const name = String(body.name ?? '').slice(0, 200).trim();
  const email = String(body.email ?? '').slice(0, 200).trim();
  const phone = String(body.phone ?? '').slice(0, 60).trim();

  if (!name || !message || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  const payload = { subject, name, email, phone, message, receivedAt: new Date().toISOString() };

  // Deliver to a webhook (e.g. a Power Automate HTTP trigger) when configured.
  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (!hook) {
    console.warn('[inquiry] INQUIRY_WEBHOOK_URL is not set; inquiry was not delivered', { subject });
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[inquiry] delivery failed', err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
}
