import { NextResponse } from "next/server";
import {
  InternalServerError,
  InvalidMethodError,
  InvalidParamsError,
} from "./errors";

export function treatInternalServerError({ cause, local }) {
  let InternalError = new InternalServerError({ cause: cause });
  console.log(`Error inside catch at ${local}`);
  console.error(InternalError);
  return NextResponse.json(InternalError, {
    status: InternalError.statusCode,
  });
}

export function treatInvalidMethodError({ method, validMethods, trace }) {
  const InvalidMethod = new InvalidMethodError({
    method,
    validMethods,
  });
  console.log(`Method ${method} used in ${trace}`);
  console.error(InvalidMethod);
  return NextResponse.json(InvalidMethod, { status: InvalidMethod.statusCode });
}

export function verifyUserParams({ username, email, password, gender }) {
  let nullParams = [];
  if (!username) nullParams.push("username");
  if (email == "") {
    nullParams.push("email");
  }
  if (!password) nullParams.push("password");
  if (!gender) nullParams.push("gender");
  if (nullParams.length > 0) {
    throw new Error(`nullParams:${nullParams}`);
  }
  return true;
}

export function treatInvalidParamsError({ nullParams, invalidFormat }) {
  const InvalidParams = new InvalidParamsError({ nullParams, invalidFormat });
  console.log("Invalid params was shared to api/v1/sing-up");
  console.error(InvalidParams);
  return NextResponse.json(InvalidParams, { status: InvalidParams.statusCode });
}
