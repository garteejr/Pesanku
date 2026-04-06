import { BASE_URL } from "./base";

export const facebookLogin = async (accessToken) => {

  const response = await fetch(`${BASE_URL}/api/v1/auth/facebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ accessToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Facebook login gagal");
  }

  return data;
};
