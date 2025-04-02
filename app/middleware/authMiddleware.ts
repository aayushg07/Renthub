import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return !!decoded;
  } catch {
    return false;
  }
}

export async function isAdmin(request: Request): Promise<boolean> {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

export async function adminMiddleware(request: Request) {
  const isAdminUser = await isAdmin(request); 
  if (!isAdminUser) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 403 }
    );
  }
  return null;
}
