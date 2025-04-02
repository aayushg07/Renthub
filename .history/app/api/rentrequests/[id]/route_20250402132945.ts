import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import RentRequest from "@/app/models/RentRequest";
import { adminMiddleware } from "@/app/middleware/authMiddleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const isAdmin = await adminMiddleware(request);
  if (isAdmin) return isAdmin;

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing request ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await RentRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Rent request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update rent request" },
      { status: 500 }
    );
  }
}
