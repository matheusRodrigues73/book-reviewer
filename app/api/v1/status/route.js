import { NextResponse } from "next/server";
import database from "infra/database";
import {
  treatInternalServerError,
  treatInvalidMethodError,
} from "infra/treatErrors";

// eslint-disable-next-line no-unused-vars
export async function GET(request) {
  try {
    const updatedAt = new Date().toISOString();
    const versionResponse = await database.query("SHOW server_version;");
    const maxConnectionsResponse = await database.query(
      "SHOW max_connections;",
    );
    const openedConnectionsResponse = await database.query(
      `SELECT count(*) FROM pg_stat_activity WHERE datname = '${process.env.POSTGRES_DB}';`,
    );
    const version = versionResponse.rows[0].server_version;
    const maxConnections = maxConnectionsResponse.rows[0].max_connections;
    const openedConnections = openedConnectionsResponse.rows[0].count;
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
  } catch (error) {
    return treatInternalServerError({
      cause: error,
      local: "status controller:",
    });
  }
}

export function POST() {
  return treatInvalidMethodError({
    method: "POST",
    validMethods: "GET",
    trace: "'api/v1/status:'",
  });
}
export function PUT() {
  return treatInvalidMethodError({
    method: "PUT",
    validMethods: "GET",
    trace: "'api/v1/status:'",
  });
}
export function DELETE() {
  return treatInvalidMethodError({
    method: "DELETE",
    validMethods: "GET",
    trace: "'api/v1/status:'",
  });
}
