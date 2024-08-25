import database from "infra/database";
import { NextResponse } from "next/server";
import pgMigrate from "node-pg-migrate";

async function loadMigrations(client, method) {
  const defaultConfig = {
    dbClient: client,
    dir: "infra/migrations",
    dryRun: true,
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  };
  if (method === "post") {
    return await pgMigrate({ ...defaultConfig, dryRun: false });
  }
  return await pgMigrate(defaultConfig);
}

// eslint-disable-next-line no-unused-vars
export async function GET(request) {
  let client;
  try {
    client = await database.clientConnection();
    const migrations = await loadMigrations(client);
    return NextResponse.json(migrations, { status: 200 });
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
    const migrations = await loadMigrations(client, "post");
    if (migrations.length === 0) {
      return NextResponse.json(migrations, { status: 200 });
    }
    return NextResponse.json(migrations, { status: 201 });
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    client.end();
  }
}
