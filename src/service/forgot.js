import { BASE_URL } from "./base";

export const forgotPassword = async (email, code, password) => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, code, password }),
  });
  const data = await response.json().catch(() => ({ message: "Invalid server response" }));
  if (!response.ok) throw new Error(data.message || "Reset password gagal");
  return data;
};