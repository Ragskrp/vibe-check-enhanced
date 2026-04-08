import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, query } = await req.json();

    // SERVER-SIDE LOGIC: Securely handle the data
    // Your email is NOT visible in the browser HTML/JS
    const targetEmail = process.env.CONTACT_EMAIL || 'ragskrpreddy@gmail.com';

    console.log('----------------------------');
    console.log('NEW CONTACT FORM SUBMISSION');
    console.log('To:', targetEmail);
    console.log('From:', name);
    console.log('Email:', email);
    console.log('Message:', query);
    console.log('----------------------------');

    /**
     * PRO TIP: To receive actual emails in your inbox, 
     * most Vercel users use a free service like Formspree or Resend.
     * I have built this as a Next.js Route Handler so your logic remains 100% hidden.
     */

    return NextResponse.json({ 
      success: true, 
      message: 'Vibe received! We will get back to you soon.' 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
