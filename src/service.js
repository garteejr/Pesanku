const BASE_URL = "https://backend-pesankuapp.vercel.app";


export const loginUser = async (email, password) => {
  try {

    console.log("LOGIN EMAIL:", email);
    console.log("LOGIN PASSWORD:", password);

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

    const data = await response.json();

    console.log("LOGIN RESPONSE:", data);
    console.log("STATUS:", response.status);

    if (!response.ok) {
      throw new Error(data.message || "Login gagal");
    }

    return data;

  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {

    const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Register gagal");
    }

    return data;

  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};


export const googleLogin = async (idToken) => {
  try {

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

  } catch (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
};


export const facebookLogin = async (accessToken) => {
  try {

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

  } catch (error) {
    console.error("Facebook Login Error:", error);
    throw error;
  }
};


export const getCurrentUser = async () => {
  try {

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

  } catch (error) {
    console.error("Get User Error:", error);
    throw error;
  }
};


export const logoutUser = async () => {

  await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "/login";
};
