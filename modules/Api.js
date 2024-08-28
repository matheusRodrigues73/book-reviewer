import database from "infra/database";
import pgMigrate from "node-pg-migrate";
import { resolve } from "node:path";

async function status() {
  const updatedAt = new Date().toISOString();
  const responseVersion = await database.query("SHOW server_version;");
  const version = responseVersion.rows[0].server_version;
  const responseMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = responseMaxConnections.rows[0].max_connections;
  const responseOpenedConnections = await database.query(
    `SELECT count(*) FROM pg_stat_activity WHERE datname = '${process.env.POSTGRES_DB}';`,
  );
  const openedConnections = responseOpenedConnections.rows[0].count;
  return {
    updatedAt,
    version,
    maxConnections,
    openedConnections,
  };
}

async function migrations(method) {
  let client;
  try {
    client = await database.clientConnection();
    const defaultConfig = {
      dbClient: client,
      dir: resolve("infra", "migrations"),
      dryRun: true,
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    };
    if (method === "post") {
      return await pgMigrate({ ...defaultConfig, dryRun: false });
    }
    return await pgMigrate(defaultConfig);
  } catch (error) {
    console.error;
    return error;
  } finally {
    client.end();
  }
}

const Api = {
  status,
  migrations,
};

export default Api;
