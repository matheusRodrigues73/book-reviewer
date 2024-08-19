import { Client } from "pg";

async function query(query) {
  let client;
  try {
    client = await clientConnection();
    const response = await client.query(query);
    return response;
  } catch (error) {
    console.log(error);
    return new Error(error);
  } finally {
    await client.end();
  }
}

async function clientConnection() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  return client;
}

export default {
  query,
  clientConnection,
};
