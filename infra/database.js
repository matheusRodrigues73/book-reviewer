import { Client } from "pg";

async function query(query) {
  let client;
  try {
    client = new Client({
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
    });
    await client.connect();
    const response = await client.query(query);
    return response;
  } catch (error) {
    console.log(error);
    return new Error(error);
  } finally {
    await client.end();
  }
}

export default {
  query,
};
