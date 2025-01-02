"use server";

import verifyInputsState from "./verifyInputsState";
import { redirect } from "next/navigation";

export default async function submitNewUser({
  username,
  email,
  password,
  verifyPassword,
  gender,
}) {
  let response;
  try {
    verifyInputsState(username, email, password, verifyPassword, gender);
    response = await fetch("/api/v1/sing-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, gender }),
    });
  } catch (err) {
    throw new Error(err);
  }

  if (response?.status === 201) {
    redirect("/");
  }
}
