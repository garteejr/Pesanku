import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin, loginUser } from "../service";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ================= LOGIN EMAIL =================
  const handleLogin = async (email, password) => {
    if (!email || !password) {
      toast.error("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Sedang masuk...");
    try {
      await loginUser(email.trim().toLowerCase(), password.trim());
      toast.success("Login berhasil!", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login gagal", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const toastId = toast.loading("Masuk dengan Google...");
    try {
      const idToken = credentialResponse.credential; // ✅ ini id_token nya
      console.log("ID TOKEN:", idToken);
      await googleLogin(idToken);
      toast.success("Login Google berhasil!", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Login Google gagal", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Login Google gagal, coba lagi.");
  };

  return {
    loading,
    handleLogin,
    handleGoogleSuccess,
    handleGoogleError,
  };
};