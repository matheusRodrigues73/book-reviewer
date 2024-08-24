import retry from "async-retry";

async function waitForServices() {
  await waitForWebServer(Date.now());

  async function waitForWebServer(startedAt) {
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

export default { waitForServices };
