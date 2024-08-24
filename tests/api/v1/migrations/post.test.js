import database from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForServices();
  await database.query("DROP SCHEMA public cascade; CREATE SCHEMA public;");
});

test('POST to "api/v1/migrations" should return 201', async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);
  const responseBody1 = await response1.json();
  expect(responseBody1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const responseBody2 = await response2.json();
  expect(responseBody2.length).toBe(0);
});
