import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, sendOtp, verifyOtp } from "../service";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import petir from "../assets/icon.svg";

const RegisterCard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // STEP 1 - SEND OTP
  const handleNext = async () => {
    if (!email) return toast.error("Email wajib diisi");
    setLoading(true);
    try {
      await sendOtp(email, "register");
      toast.success("OTP dikirim ke email!");
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTP INPUT
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // STEP 2 - VERIFY OTP
  const handleOtpVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return toast.error("Masukkan 6 digit kode OTP");
    setLoading(true);
    try {
      await verifyOtp(email, code);
      toast.success("OTP berhasil diverifikasi!");
      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 - REGISTER
  const handleRegister = async () => {
    if (!name || !password) return toast.error("Semua field wajib diisi");
    setLoading(true);
    try {
      await registerUser(name, email, password, otp.join(""));
      toast.success("Akun berhasil dibuat!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl w-[400px] shadow-xl text-center">

      <div className="flex justify-center mb-4">
        <img src={petir} alt="icon" className="w-12 h-12" />
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-2">Ayo Bergabung!</h2>
          <p className="text-gray-400 text-sm mb-6">
            Masukan email kamu untuk mulai perjalanan baru.
          </p>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Mail className="text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none ml-2 w-full text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Kode Verifikasi"}
          </button>

          <p
            onClick={() => navigate("/login")}
            className="text-sm text-gray-400 mt-4 cursor-pointer hover:text-black"
          >
            Sudah punya akun? Masuk
          </p>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-2">Verifikasi Email</h2>
          <p className="text-gray-400 text-sm mb-6">
            Masukkan kode ke{" "}
            <span className="font-semibold text-black">{email}</span>
          </p>

          <div className="flex gap-2 justify-center mb-6">
            {otp.map((val, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    document.getElementById(`otp-${i - 1}`).focus();
                  }
                }}
                className="w-10 h-12 text-center text-lg font-bold bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            ))}
          </div>

          <button
            onClick={handleOtpVerify}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verifikasi"}
          </button>

          <p
            onClick={() => setStep(1)}
            className="text-sm text-gray-400 mt-4 cursor-pointer hover:text-black"
          >
            Ganti email?
          </p>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-2">Lengkapi Profil</h2>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
            <User className="text-gray-400" size={18} />
            <input
              placeholder="Nama Lengkap"
              className="bg-transparent outline-none ml-2 w-full text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Lock className="text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent outline-none ml-2 w-full text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword
                ? <EyeOff className="text-gray-400" size={18} />
                : <Eye className="text-gray-400" size={18} />
              }
            </button>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Buat Akun"}
          </button>
        </>
      )}

    </div>
  );
};

export default RegisterCard;