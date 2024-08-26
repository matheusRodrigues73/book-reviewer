import { NextResponse } from "next/server";
import Api from "modules/Api.js";

// eslint-disable-next-line no-unused-vars
export async function GET(request) {
  const { updatedAt, version, maxConnections, openedConnections } =
    await Api.status();
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
