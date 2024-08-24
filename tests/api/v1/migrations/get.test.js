import database from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForServices();
  await database.query("DROP SCHEMA public cascade; CREATE SCHEMA public;");
});

test('GET to "api/v1/migrations" should return 200', async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  console.log(responseBody);
  expect(responseBody.length).toBeGreaterThan(0);
});
