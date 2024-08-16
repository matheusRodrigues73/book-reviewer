import { NextResponse } from "next/server";

export async function GET(request) {
  const updatedAt = new Date().toISOString();
  return NextResponse.json({ updated_at: updatedAt }, { status: 200 });
}
