import { BASE_URL } from "./base";

export const getCurrentUser = async () => {

  const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  console.log("CURRENT USER:", data);

  if (!response.ok) {
    throw new Error(data.message || "Unauthorized");
  }

  return data;
};

export const logoutUser = async () => {

  await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "/login";
};
