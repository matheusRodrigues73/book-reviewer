import { NextResponse } from "next/server";
import pgMigrate from "node-pg-migrate";

async function loadMigrations(method) {
  const defaultConfig = {
    databaseUrl: process.env.DATABASE_URL,
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

export async function GET(request) {
  const migrations = await loadMigrations();

  return NextResponse.json(migrations, { status: 200 });
}

export async function POST(request) {
  const migrations = await loadMigrations("post");
  if (migrations.length === 0) {
    return NextResponse.json(migrations, { status: 200 });
  }
  return NextResponse.json(migrations, { status: 201 });
}
