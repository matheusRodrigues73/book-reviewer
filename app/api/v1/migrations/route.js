import migrationRunner from "node-pg-migrate";
import { NextResponse } from "next/server";
import database from "infra/database";
import { resolve } from "node:path";
import {
  treatInternalServerError,
  treatInvalidMethodError,
} from "infra/treatErrors";

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
    return NextResponse.json(pendingMigrations, { status: 200 });
  } catch (error) {
    return treatInternalServerError({
      cause: error.message,
      local: "migrations GET controller",
    });
  } finally {
    await client?.end();
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
    return treatInternalServerError({
      cause: error,
      local: "migrations POST controller",
    });
  } finally {
    client?.end();
  }
}

export function PUT() {
  return treatInvalidMethodError({
    method: "PUT",
    validMethods: "GET, POST",
    trace: "api/v1/migrations",
  });
}

export function DELETE() {
  return treatInvalidMethodError({
    method: "DELETE",
    validMethods: "GET, POST",
    trace: "api/v1/migrations",
  });
}
