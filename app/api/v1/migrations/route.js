import database from "infra/database";
import Api from "modules/Api";
import { NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export async function GET(request) {
  let client;
  try {
    client = await database.clientConnection();
    const pendentsMigrations = await Api.migrations(client);
    return NextResponse.json(pendentsMigrations, { status: 200 });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    client.end();
  }
}

// eslint-disable-next-line no-unused-vars
export async function POST(request) {
  let client;
  try {
    client = await database.clientConnection();
    const migratedMigrations = await Api.migrations(client, "post");
    if (migratedMigrations.length === 0) {
      return NextResponse.json(migratedMigrations, { status: 200 });
    }
    return NextResponse.json(migratedMigrations, { status: 201 });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    client.end();
  }
}
