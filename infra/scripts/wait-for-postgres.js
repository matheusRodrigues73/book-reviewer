const { exec } = require("node:child_process");

const startedAt = Date.now();
function showAwiatedTime() {
  return ((Date.now() - startedAt) / 1000).toFixed(2);
}

function showSpinner() {
  const spinnerInterval = 200;
  const spinner = ["🙈", "🙉", "🙊"];
  const emojiIndex = Math.floor(Date.now() / spinnerInterval) % spinner.length;
  return `${showAwiatedTime()} ${spinner[emojiIndex]}`;
}

function checkPostgres() {
  exec("docker exec postgres_dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(`\r${showSpinner()} Awaiting to connect`);
      checkPostgres();
      return;
    }

    console.log("\n\n🤝 Postgres already accepting connections!\n");
  }
}

console.log("\n👀 Watching for postgres connection\n");

checkPostgres();
