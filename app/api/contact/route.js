import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const payload = await req.json();
    const name = payload?.name?.trim();
    const email = payload?.email?.trim();
    const query = payload?.query?.trim();
    const targetEmail = process.env.CONTACT_EMAIL || 'ragskrpreddy@gmail.com';
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (!name || !email || !query) {
      return NextResponse.json(
        { success: false, error: 'Please complete every field before sending your message.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!webhookUrl) {
      return NextResponse.json(
        {
          success: false,
          message: `The contact form is not forwarding messages yet. Please email ${targetEmail} directly.`,
          fallbackEmail: targetEmail,
        },
        { status: 503 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site: 'VIBEMENOW',
        targetEmail,
        name,
        email,
        query,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `We could not forward your message right now. Please email ${targetEmail} directly.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thanks. Your message has been forwarded to the VIBEMENOW inbox.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
