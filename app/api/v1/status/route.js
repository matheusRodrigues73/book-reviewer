import { NextResponse } from "next/server";
import database from "infra/database";

export async function GET(request) {
  const updatedAt = new Date().toISOString();
  const responseVersion = await database.query("SHOW server_version;");
  const version = responseVersion.rows[0].server_version;
  const responseMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = responseMaxConnections.rows[0].max_connections;
  const responseOpenedConnections = await database.query(
    `SELECT count(*) FROM pg_stat_activity WHERE datname = '${process.env.POSTGRES_DB}';`,
  );
  const openedConnections = responseOpenedConnections.rows[0].count;
  return NextResponse.json(
    {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version,
          max_connections: maxConnections,
          opened_connections: openedConnections,
        },
      },
    },
    { status: 200 },
  );
}
