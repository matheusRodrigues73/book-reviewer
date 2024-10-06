import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "modules/User";

export async function POST(request) {
  const { username, email, password, gender } = await request.json();
  const hash = await bcrypt.hash(password, 11);
  const user = new User({ username, email, hash, gender });
  await user.storeUser();

  return NextResponse.json(
    { id: user.id, username: user.username, gender: user.gender },
    { status: 201 },
  );
}
