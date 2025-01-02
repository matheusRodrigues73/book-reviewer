import { NextResponse } from "next/server";
import database from "infra/database";
import { InternalServerError } from "infra/errors";

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
    let InternalError = new InternalServerError({ cause: error });
    console.log("Error inside catch at status controller:");
    console.error(InternalError);
    return NextResponse.json(InternalError, {
      status: InternalError.statusCode,
    });
  }
}
