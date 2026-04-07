import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { sendOtp, verifyOtp, forgotPassword } from "../service";
import toast from "react-hot-toast";
import petir from "../assets/icon.svg";

const ForgotPasswordCard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // STEP 1 - kirim OTP
  const handleSendReset = async () => {
    if (!email) return toast.error("Email wajib diisi");
    setLoading(true);
    try {
      await sendOtp(email, "forgot");
      toast.success("OTP dikirim ke email!");
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // input OTP
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-forgot-${index + 1}`)?.focus();
    }
  };

  // STEP 2 - verifikasi OTP
  const handleOtpVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return toast.error("Masukkan 6 digit OTP");
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

  // STEP 3 - simpan password
  const handleSavePassword = async () => {
    if (newPassword.length < 8) return toast.error("Password minimal 8 karakter");
    if (newPassword !== confirmPassword) return toast.error("Password tidak cocok");
    setLoading(true);
    try {
      await forgotPassword(email, otp.join(""), newPassword);
      toast.success("Password berhasil diubah!");
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
          <h2 className="text-2xl font-bold mb-2">Pemulihan Kata Sandi</h2>
          <p className="text-gray-400 text-sm mb-6">Masukkan email terdaftar Anda.</p>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none ml-2 w-full text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleSendReset}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Kode Reset"}
          </button>

          <p
            onClick={() => navigate("/login")}
            className="text-sm text-gray-400 mt-4 cursor-pointer hover:text-black"
          >
            Kembali ke login
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
                id={`otp-forgot-${i}`}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    document.getElementById(`otp-forgot-${i - 1}`)?.focus();
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
            {loading ? "Memverifikasi..." : "Verifikasi"}
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
          <h2 className="text-2xl font-bold mb-2">Buat Kata Sandi Baru</h2>
          <p className="text-gray-400 text-sm mb-6">Masukkan kata sandi baru yang kuat.</p>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
            <Lock className="text-gray-400" size={18} />
            <input
              type={showNew ? "text" : "password"}
              placeholder="Kata Sandi Baru"
              className="bg-transparent outline-none ml-2 w-full text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={() => setShowNew(!showNew)}>
              {showNew
                ? <EyeOff className="text-gray-400" size={18} />
                : <Eye className="text-gray-400" size={18} />
              }
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Lock className="text-gray-400" size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Konfirmasi Kata Sandi"
              className="bg-transparent outline-none ml-2 w-full text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm
                ? <EyeOff className="text-gray-400" size={18} />
                : <Eye className="text-gray-400" size={18} />
              }
            </button>
          </div>

          <button
            onClick={handleSavePassword}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan & Masuk"}
          </button>

          <p className="text-gray-400 text-xs mt-4">
            Kata sandi harus minimal 8 karakter.
          </p>
        </>
      )}

    </div>
  );
};

export default ForgotPasswordCard;