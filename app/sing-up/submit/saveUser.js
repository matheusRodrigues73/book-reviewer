import verifyInputsState from "./verifyInputsState";

export default async function submitNewUser({
  username,
  email,
  password,
  verifyPassword,
  gender,
}) {
  if (verifyInputsState(username, email, password, verifyPassword, gender)) {
    await fetch("http://localhost:3000/api/v1/sing-up", {
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
