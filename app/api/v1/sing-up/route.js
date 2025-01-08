import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "modules/User";
import {
  treatInternalServerError,
  treatInvalidParamsError,
  verifyUserParams,
} from "infra/treatErrors";

export async function POST(request) {
  try {
    const { username, email, password, gender } = await request.json();
    verifyUserParams({ username, email, password, gender });
    const hash = await bcrypt.hash(password, 11);
    const user = new User({ username, email, hash, gender });
    await user.storeUser();

    return NextResponse.json(
      { id: user.id, username: user.username, gender: user.gender },
      { status: 201 },
    );
  } catch (error) {
    if (error.message.match(/nullParams/)) {
      const nullParams = error.message.replace("nullParams:", "");
      return treatInvalidParamsError({ nullParams });
    }
    return treatInternalServerError({ cause: error });
  }
}
