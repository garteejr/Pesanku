import { BASE_URL } from "./base";

export const sendOtp = async (email, purpose) => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, purpose }),
  });
  const data = await response.json().catch(() => ({ message: "Invalid server response" }));
  if (!response.ok) throw new Error(data.message || "Gagal kirim OTP");
  return data;
};

export const verifyOtp = async (email, code) => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, code }),
  });
  const data = await response.json().catch(() => ({ message: "Invalid server response" }));
  if (!response.ok) throw new Error(data.message || "OTP tidak valid");
  return data;
};