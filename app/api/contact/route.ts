// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    console.log('body', body);

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.NEXT_PUBLIC_RECEIVER_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #1c102b; color: #ffffff; padding: 30px; border-radius: 0px; border: 1px solid #3f2e6a;">
   <h2 style="margin-bottom: 20px; color: #FF005D;">
  New Message from Kandicompass Contact Form
</h2>

    
    <p style="margin-bottom: 10px;">
      <strong style="color: #00D1FF;">Name:</strong> ${name}
    </p>
    
    <p style="margin-bottom: 10px;">
      <strong style="color: #00D1FF;">Email:</strong> ${email}
    </p>
    
    <p style="margin-bottom: 20px;">
      <strong style="color: #FF005D;">Message:</strong><br/>
      <span style="color: #cccccc;">${message}</span>
    </p>

    <footer style="margin-top: 30px; font-size: 12px; color: #888888;">
      <hr style="border: none; border-top: 1px solid #333;" />
      <p style="margin-top: 10px;">This message was sent via the contact form on your website.</p>
    </footer>
  </div>
`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
