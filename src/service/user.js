import { BASE_URL } from "./base";

// ================= GET CURRENT USER =================
export const getCurrentUser = async () => {

  try {

    const response = await fetch(
      `${BASE_URL}/api/v1/auth/me`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const data = await response.json();

    console.log("CURRENT USER:", data);

    return data;

  } catch (error) {

    console.error("Get user error:", error);

    throw error;
  }
};

// ================= LOGOUT =================
export const logoutUser = async () => {

  try {

    await fetch(
      `${BASE_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    window.location.href = "/login";

  } catch (error) {

    console.error("Logout error:", error);

    window.location.href = "/login";
  }
};
