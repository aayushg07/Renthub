import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Message from '@/app/models/Message';
import { isAdmin } from '@/app/middleware/authMiddleware';

// Ensure the route handler is async and properly handles params
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Update the type to indicate params is a Promise
) {
  await dbConnect();

  if (!(await isAdmin(request))) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 403 }
    );
  }

  try {
    const { reply, replySubject } = await request.json();
    // Await params to resolve it, as it might be a Promise in some Next.js configurations
    const { id } = await params; // Destructure the id from the resolved params

    const message = await Message.findByIdAndUpdate(
      id,
      {
        reply,
        replySubject,
        repliedAt: new Date(),
        isRead: true,
      },
      { new: true }
    );

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Message reply error:', error);
    return NextResponse.json(
      { error: 'Error replying to message' },
      { status: 500 }
    );
  }
}