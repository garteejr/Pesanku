import { BASE_URL } from "./base";

export const googleLogin = async (idToken) => {

  console.log("GOOGLE TOKEN:", idToken);

  const response = await fetch(`${BASE_URL}/api/v1/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json();

  console.log("GOOGLE RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data.error || "Google login gagal");
  }

  return data;
};
