import migrationRunner from "node-pg-migrate";
import { NextResponse } from "next/server";
import database from "infra/database";
import { resolve } from "node:path";

// eslint-disable-next-line no-unused-vars
export async function GET(request) {
  let client;
  try {
    client = await database.clientConnection();
    const pendingMigrations = await migrationRunner({
      dbClient: client,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      verbose: true,
      direction: "up",
      migrationsTable: "pgmigrations",
    });
    console.log("test");
    return NextResponse.json(pendingMigrations, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    await client.end();
  }
}

// eslint-disable-next-line no-unused-vars
export async function POST(request) {
  let client;
  try {
    client = await database.clientConnection();
    const migratedMigrations = await migrationRunner({
      dbClient: client,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    if (migratedMigrations.length > 0) {
      return NextResponse.json(migratedMigrations, { status: 201 });
    }
    return NextResponse.json(migratedMigrations, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  } finally {
    client.end();
  }
}
