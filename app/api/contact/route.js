import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getContactEmailHtml } from '@/utils/emailTemplate';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Check if SMTP credentials exist
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { error: 'Mail server credentials are not configured. Please create a .env.local file with SMTP_USER and SMTP_PASS.' },
        { status: 500 }
      );
    }

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true' || true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = getContactEmailHtml(name, email, subject, message);

    // Mail configurations
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, 
      to: 'abdullahverse9176@gmail.com', 
      replyTo: email, 
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please check SMTP settings.' },
      { status: 500 }
    );
  }
}
