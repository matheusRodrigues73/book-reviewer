import User from "modules/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, password, gender } = await request.json();
    const hash = await User.encryptPassword(password);
    const user = new User({ username, email, hash, gender });
    await user.storeUser();

    return NextResponse.json(
      { id: user.id, username: user.username, gender: user.gender },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Could not save the user" },
      { status: 500 },
    );
  }
}
