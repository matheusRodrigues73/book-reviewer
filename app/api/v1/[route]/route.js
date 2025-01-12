import { NotFoundError } from "infra/errors";
import { NextResponse } from "next/server";

export function GET({ params }) {
  const NotFound = new NotFoundError(params);
  console.log(NotFound);
  return NextResponse.json(NotFound, { status: NotFound.statusCode });
}
