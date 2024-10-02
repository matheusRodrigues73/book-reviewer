import verifyInputsState from "./verifyInputsState";

export default async function submitNewUser({
  username,
  email,
  password,
  verifyPassword,
  gender,
}) {
  if (verifyInputsState(username, email, password, verifyPassword, gender)) {
    await fetch(process.env.MIGRATIONS_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password, gender }),
    });
    alert("ok");
  } else {
    console.log("no");
  }
}
