import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForServices();
  await orchestrator.clearDatabase();
  await orchestrator.waitForMigrations();
});

describe('POST "api/v1/sing-up"', () => {
  describe("Anonymous User", () => {
    test("Sing up new account", async () => {
      const response = await fetch("http://localhost:3000/api/v1/sing-up", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: "random",
          email: "random@gmail.com",
          password: "1234",
          gender: "Not Inform",
        }),
      });
      expect(response.status).toBe(201);
      const responseBody = await response.json();
      expect(responseBody.username).toBe("random");
    });
    test("Try sing up with invalid email", async () => {
      const response = await fetch("http://localhost:3000/api/v1/sing-up", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: "Matheus",
          email: "",
          password: "1234",
          gender: "Not Inform",
        }),
      });
      expect(response.status).toBe(400);
      const responseBody = await response.json();
      expect(responseBody.nullParams).toBe("email");
    });
  });
});
