import { NextResponse } from 'next/server';
import { isAdmin } from '@/app/middleware/authMiddleware';

// This is a placeholder - you'd typically integrate with an email service like SendGrid or store in DB
export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 403 }
    );
  }

  try {
    const { senderEmail, recipientEmail, subject, message } = await request.json();

    if (!senderEmail || !recipientEmail || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Simulate sending an email (replace with actual email service integration)
    console.log('Sending email:', { senderEmail, recipientEmail, subject, message });

    // For now, just log and return success
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin contact error:', error);
    return NextResponse.json(
      { error: 'Error sending message' },
      { status: 500 }
    );
  }
}