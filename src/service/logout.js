import { BASE_URL } from "./base";

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json().catch(() => ({ message: "Invalid server response" }));
  if (!response.ok) throw new Error(data.message || "Logout gagal");
  return data;
};