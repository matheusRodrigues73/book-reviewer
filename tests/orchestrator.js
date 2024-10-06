import retry from "async-retry";
import database from "infra/database";

async function waitForServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusEndpoint, {
      retries: 100,
      maxTimeout: 1000,
      minTimeout: 500,
    });

    async function fetchStatusEndpoint() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        return new Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("DROP SCHEMA public cascade; CREATE SCHEMA public;");
}

async function waitForMigrations() {
  await waitForTables();
  function waitForTables() {
    return retry(runMigrations, {
      retries: 100,
      maxTimeout: 1000,
      minTimeout: 500,
    });
    async function runMigrations() {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      if (!response.ok) {
        return new Error();
      }
    }
  }
}

const orchestrator = { waitForServices, clearDatabase, waitForMigrations };

export default orchestrator;
