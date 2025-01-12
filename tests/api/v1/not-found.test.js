describe("GET to api/v1/[NotFoundRoute]", () => {
  describe("Anonymous User", () => {
    test("Try access non-existent route", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/invalid-route",
      );
      expect(response.status).toBe(404);
    });
  });
});
