import { BASE_URL } from "./base";

export const loginUser = async (email, password) => {

  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: email.trim(),
      password: password.trim(),
    }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = { message: "Invalid server response" };
  }

  if (!response.ok) {
    throw new Error(data.message || "Login gagal");
  }

  return data;
};