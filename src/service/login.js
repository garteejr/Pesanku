import { BASE_URL } from "./base";

export const loginUser = async (email, password) => {

  if (!email || !password) {
    throw new Error("Email dan password wajib diisi");
  }

  try {

    const response = await fetch(
      `${BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // penting untuk cookie
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Server tidak merespon JSON");
    }

    if (!response.ok) {
      throw new Error(data.message || "Login gagal");
    }

    return data;

  } catch (error) {

    console.error("Login error:", error);

    if (error.message === "Failed to fetch") {
      throw new Error("Tidak bisa konek ke server");
    }

    throw error;
  }
};
