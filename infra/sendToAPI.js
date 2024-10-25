export default async function sendToAPI(address, { method, headers, body }) {
  try {
    const response = await fetch(`${process.env.API_URL}${address}`, {
      method: method ?? "GET",
      headers: headers ?? null,
      body: body ?? null,
    });
    if (response.status === 500) {
      const responseBody = response.json();
      if (responseBody.case === "email") {
        throw new Error("email");
      }
      throw new Error(responseBody.error);
    }
  } catch (err) {
    throw new Error(err);
  }
}
