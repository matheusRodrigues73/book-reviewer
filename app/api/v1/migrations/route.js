import Api from "modules/Api";
import { NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export async function GET(request) {
  try {
    const pendentsMigrations = await Api.migrations();
    return NextResponse.json(pendentsMigrations, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}

// eslint-disable-next-line no-unused-vars
export async function POST(request) {
  try {
    const migratedMigrations = await Api.migrations("post");
    if (migratedMigrations.length === 0) {
      return NextResponse.json(migratedMigrations, { status: 200 });
    }
    return NextResponse.json(migratedMigrations, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
