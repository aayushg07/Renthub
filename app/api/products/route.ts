import { NextResponse } from 'next/server';
import Product from '@/app/models/Product';
import dbConnect from '@/app/lib/dbConnect';
import { adminMiddleware } from '@/app/middleware/authMiddleware';

// GET remains public - no auth needed
export async function GET() {
  await dbConnect();
  
  try {
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

// POST requires admin access
export async function POST(request: Request) {
  // Check admin authorization
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  await dbConnect();

  try {
    const { name, description, price, imageUrl, category } = await request.json();
    const newProduct = new Product({ name, description, price, imageUrl, category });
    await newProduct.save();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  } return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
