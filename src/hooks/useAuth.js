import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser, googleLogin, getCurrentUser } from "../service";

export const useAuth = () => {

  const [loading, setLoading] = useState(false);

  // ================= LOGIN EMAIL =================
  const handleLogin = async (email, password) => {

    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {

      console.log("========== DEBUG LOGIN ==========");
      console.log("Email raw:", email);
      console.log("Password raw:", password);

      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      console.log("Email dikirim:", cleanEmail);
      console.log("Password dikirim:", cleanPassword);
      console.log("=================================");

      await loginUser(cleanEmail, cleanPassword);

      const user = await getCurrentUser();

      console.log("User:", user);

      alert("Login berhasil!");
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      setLoading(true);

      try {

        console.log("Google token:", tokenResponse.access_token);

        await googleLogin(tokenResponse.access_token);

        const user = await getCurrentUser();

        console.log("User:", user);

        alert("Login Google berhasil");
        window.location.href = "/dashboard";

      } catch (error) {
        console.error("Google login error:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      alert("Google login gagal");
    }
  });

  const facebookAuth = () => {
    alert("Facebook login belum tersedia");
  };

  return {
    loading,
    handleLogin,
    googleAuth,
    facebookAuth
  };
};
