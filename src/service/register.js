import { BASE_URL } from "./base";

export const registerUser = async (name, email, password, otp) => {
  if (!name || !email || !password || !otp) {
    throw new Error("Semua field wajib diisi");
  }
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      otp,
    }),
  });
  let data;
  try { data = await response.json(); }
  catch { data = { message: "Invalid server response" }; }
  if (!response.ok) throw new Error(data.message || "Register gagal");
  return data;
};

export const sendOtp = async (email, purpose) => {
  if (!email) throw new Error("Email wajib diisi");
  const response = await fetch(`${BASE_URL}/api/v1/auth/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      purpose,
    }),
  });
  let data;
  try { data = await response.json(); }
  catch { data = { message: "Invalid server response" }; }
  if (!response.ok) throw new Error(data.message || "Gagal kirim OTP");
  return data;
};

export const verifyOtp = async (email, code) => {
  if (!email || !code) throw new Error("OTP tidak lengkap");
  const response = await fetch(`${BASE_URL}/api/v1/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      code,
    }),
  });
  let data;
  try { data = await response.json(); }
  catch { data = { message: "Invalid server response" }; }
  if (!response.ok) throw new Error(data.message || "OTP salah");
  return data;
};