import bcrypt from "bcryptjs";
import database from "infra/database";
import User from "modules/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, password, gender } = await request.json();
    const hash = await bcrypt.hash(password, 11);
    const newUser = new User({ username, email, hash, gender });
    await database.query(
      `INSERT INTO users VALUES ('${newUser.id}', '${newUser.username}', '${newUser.email}', '${newUser.hash}', '${newUser.gender}');`,
    );
    return NextResponse.json(
      { id: newUser.id, username: newUser.username, gender: newUser.gender },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Could not save the user" },
      { status: 500 },
    );
  }
}
