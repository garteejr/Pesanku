import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser, googleLogin, getCurrentUser } from "../service";
import petir from "../assets/icon.svg";

function LoginCard() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  
  const handleGetStarted = async () => {

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

  
  const handleGoogleLogin = useGoogleLogin({
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


  const handleFacebookLogin = async () => {
    alert("Facebook login belum tersedia");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 w-[350px] shadow-xl">

      
      <div className="flex justify-center mb-4">
        <img src={petir} alt="petir" className="w-12 h-12" />
      </div>

      
      <h1 className="text-2xl font-bold text-center">
        Selamat Datang
      </h1>

      <p className="text-center text-gray-400 text-sm mb-5">
        Buat pesan untuk menghubungi Teman-teman Anda. Gratis
      </p>

      <div className="space-y-4">

        
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Mail className="text-gray-500" size={18} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              console.log("typing email:", value);
              setEmail(value);
            }}
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Lock className="text-gray-500" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              console.log("typing password:", value);
              setPassword(value);
            }}
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

        
        <div className="text-right text-sm text-gray-500 cursor-pointer hover:text-black">
          Lupa Sandi?
        </div>

       
        <button
          onClick={handleGetStarted}
          disabled={loading}
          className="w-full bg-black text-white hover:bg-gray-900 transition-all shadow-sm py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Mulai"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Atau masuk dengan
        </p>

       
        <div className="flex gap-4 justify-center">

          
          <button
            onClick={() => handleGoogleLogin()}
            className="flex items-center justify-center bg-white border border-gray-200 py-3 px-13 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg viewBox="0 0 48 48" className="w-6 h-6">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.1 1.5 7.5 2.7l5.5-5.5C33.7 3.4 29.4 1.5 24 1.5 14.7 1.5 6.7 7.3 3.4 15.6l6.8 5.3C12 14.1 17.5 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.3h12.7c-.3 1.8-1.9 4.5-5.4 6.3l8.3 6.4c4.8-4.4 7.6-10.9 7.6-18.1z"/>
              <path fill="#FBBC05" d="M10.2 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-6.8-5.3C1.2 18.3 0 21.3 0 24.5s1.2 6.2 3.4 9.7l6.8-5.3z"/>
              <path fill="#34A853" d="M24 47.5c6.5 0 11.9-2.1 15.9-5.7l-8.3-6.4c-2.2 1.5-5.1 2.5-7.6 2.5-6.5 0-12-4.6-13.9-10.7l-6.8 5.3C6.7 40.7 14.7 47.5 24 47.5z"/>
            </svg>
          </button>

          
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center bg-white border border-gray-200 py-3 px-13 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg viewBox="0 0 48 48" className="w-6 h-6">
              <path fill="#1877F2" d="M48 24C48 10.74 37.26 0 24 0S0 10.74 0 24c0 11.99 8.78 21.93 20.25 23.71V30.94h-6.09V24h6.09v-5.28c0-6.01 3.58-9.33 9.06-9.33 2.63 0 5.38.47 5.38.47v5.91h-3.03c-2.98 0-3.91 1.85-3.91 3.75V24h6.66l-1.06 6.94h-5.6v16.77C39.22 45.93 48 35.99 48 24z"/>
              <path fill="#fff" d="M33.35 30.94 34.41 24h-6.66v-4.48c0-1.9.93-3.75 3.91-3.75h3.03v-5.91s-2.75-.47-5.38-.47c-5.48 0-9.06 3.32-9.06 9.33V24h-6.09v6.94h6.09v16.77a24.2 24.2 0 0 0 7.5 0V30.94h5.6z"/>
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
}

export default LoginCard;
