import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import RentRequest from '@/app/models/RentRequest';
import Product from '@/app/models/Product';
import { isAdmin } from '@/app/middleware/authMiddleware';

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  const {
    productId,
    name,
    email,
    phone,
    address,
    days,
    total,
  } = body;

  if (!productId || !name || !email || !phone || !address || !days || !total) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const product = await Product.findById(productId);
  const productName = product?.name || 'Unknown Product';

  const newRequest = await RentRequest.create({
    productId,
    productName,
    name,
    email,
    phone,
    address,
    days,
    total,
    status: 'pending',
  });

  return NextResponse.json(newRequest, { status: 201 });
}

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  // If no email param is provided, assume admin is requesting
  if (!email) {
    const isAdminUser = await isAdmin(request);
    if (!isAdminUser) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }
  }

  const filter = email ? { email } : {};
  const requests = await RentRequest.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(requests);
}
