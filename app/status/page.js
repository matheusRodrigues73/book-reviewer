"use client";
import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function Status() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}
function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updated_at = "Carregando";
  if (!isLoading) {
    updated_at = new Date(data.updated_at).toLocaleString();
  }
  return <div>Last Update: {updated_at}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let version = "Carrengando";
  let max_connections = "Carregando";
  let opened_connections = "Carregando";
  if (!isLoading) {
    version = data.dependencies.database.version;
    max_connections = data.dependencies.database.max_connections;
    opened_connections = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <h2>Database</h2>
      <div>Version: {version}</div>
      <div>Max Connections: {max_connections}</div>
      <div>Opened Connections: {opened_connections}</div>
    </div>
  );
}
