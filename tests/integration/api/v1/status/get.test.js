test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(response.status).toBe(200);

  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database).toBeDefined();

  const database = responseBody.dependencies.database;
  expect(database.max_connections).toBe(100);
  expect(database.version).toBe("16.3");
  expect(database.opened_connections).toBe(1);
});
