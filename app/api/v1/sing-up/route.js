import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "modules/User";

export async function POST(request) {
  try {
    const { username, email, password, gender } = await request.json();
    const hash = await bcrypt.hash(password, 11);
    const user = new User({ username, email, hash, gender });
    await user.storeUser();

    return NextResponse.json(
      { id: user.id, username: user.username, gender: user.gender },
      { status: 201 },
    );
  } catch (err) {
    if (err.message === "email") {
      return NextResponse.json(
        { error: "Email already exist", case: "email" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Could not save the user", case: "other" },
      { status: 500 },
    );
  }
}
