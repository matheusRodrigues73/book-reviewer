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

async function storeUser({ id, username, email, gender, hash }) {
  let client;
  try {
    client = await clientConnection();
    await client.query(
      `INSERT INTO users VALUES (${id}, ${username}, ${email}, ${gender}, ${hash})`,
    );
  } catch (err) {
    console.log(err);
    return new Error(err);
  } finally {
    await client.end();
  }
}

const database = {
  query,
  clientConnection,
  storeUser,
};

export default database;
