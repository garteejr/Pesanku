import { BASE_URL } from "./base";

export const googleLogin = async (idToken) => {

  console.log("GOOGLE TOKEN:", idToken);

  const response = await fetch(`${BASE_URL}/api/v1/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id_token: idToken }), // ← ganti idToken jadi id_token
  });

  const data = await response.json();

  console.log("GOOGLE RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data.message || "Google login gagal");
  }

  return data;
};