import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
import petir from "../assets/icon.svg";

function LoginCard() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, handleLogin, handleGoogleSuccess, handleGoogleError } = useAuth();

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 w-[400px] shadow-xl">

      <div className="flex justify-center mb-4">
        <img src={petir} alt="petir" className="w-12 h-12" />
      </div>

      <h1 className="text-2xl font-bold text-center">Halo Lagi!</h1>
      <p className="text-center text-gray-400 text-sm mb-5">
        Masuk untuk kembali terhubung dengan teman-temanmu.
      </p>

      <div className="space-y-4">

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Mail className="text-gray-500" size={18} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Lock className="text-gray-500" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none ml-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2"
          >
            {showPassword
              ? <EyeOff className="text-gray-400" size={18} />
              : <Eye className="text-gray-400" size={18} />
            }
          </button>
        </div>

        <div
          onClick={() => navigate("/forgot-password")}
          className="text-right text-sm text-gray-500 cursor-pointer hover:text-black"
        >
          Lupa Sandi?
        </div>

        <button
          onClick={() => handleLogin(email, password)}
          disabled={loading}
          className="w-full bg-black text-white hover:bg-gray-900 transition-all shadow-sm py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Mulai"}
        </button>

        <p className="text-center text-gray-400 text-sm">Atau masuk dengan</p>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            shape="rectangular"
            text="signin_with"
            locale="id"
          />
        </div>

      </div>
    </div>
  );
}

export default LoginCard;