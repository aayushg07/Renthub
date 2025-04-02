import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Message from '@/app/models/Message';
import { isAuthenticated, isAdmin } from '@/app/middleware/authMiddleware';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { senderEmail, subject, message } = await request.json();
    console.log('Received data:', { senderEmail, subject, message }); // Debug log

    if (!senderEmail || !subject || !message) {
      return NextResponse.json(
        { error: 'Email, subject, and message are required' },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      senderEmail,
      subject,
      message
    });

    return NextResponse.json(
      { message: 'Message sent successfully', data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Message creation error:', error);
    return NextResponse.json(
      { error: 'Error sending message' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  if (!(await isAuthenticated(request)) || !(await isAdmin(request))) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 403 }
    );
  }

  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Message fetch error:', error);
    return NextResponse.json(
      { error: 'Error fetching messages' },
      { status: 500 }
    );
  }
}