import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { sendOtp, verifyOtp, forgotPassword } from "../service";
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
    if (!email) return alert("Email wajib diisi");

    setLoading(true);
    try {
      await sendOtp(email, "forgot");
      alert("OTP dikirim ke email");
      setStep(2);
    } catch (err) {
      alert(err.message);
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

    if (code.length < 6)
      return alert("Masukkan 6 digit OTP");

    setLoading(true);
    try {
      await verifyOtp(email, code);
      alert("OTP berhasil diverifikasi");
      setStep(3);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 - simpan password
  const handleSavePassword = async () => {
    if (newPassword.length < 8)
      return alert("Password minimal 8 karakter");

    if (newPassword !== confirmPassword)
      return alert("Password tidak cocok");

    setLoading(true);
    try {
      await forgotPassword(email, otp.join(""), newPassword);
      alert("Password berhasil diubah!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl w-[350px] shadow-xl text-center">

      <div className="flex justify-center mb-4">
        <img src={petir} alt="icon" className="w-12 h-12" />
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-2">
            Pemulihan Kata Sandi
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Masukkan email Anda
          </p>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none ml-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleSendReset}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? "Mengirim..." : "Kirim OTP"}
          </button>

          <p
            onClick={() => navigate("/login")}
            className="text-sm mt-4 cursor-pointer"
          >
            Kembali ke login
          </p>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-4">
            Verifikasi OTP
          </h2>

          <div className="flex gap-2 justify-center mb-6">
            {otp.map((val, i) => (
              <input
                key={i}
                id={`otp-forgot-${i}`}
                maxLength={1}
                value={val}
                onChange={(e) =>
                  handleOtpChange(e.target.value, i)
                }
                className="w-10 h-12 text-center bg-gray-100 rounded"
              />
            ))}
          </div>

          <button
            onClick={handleOtpVerify}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Verifikasi
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h2 className="text-xl font-bold mb-4">
            Password Baru
          </h2>

          <input
            type={showNew ? "text" : "password"}
            placeholder="Password baru"
            className="w-full mb-3 p-2 bg-gray-100 rounded"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi password"
            className="w-full mb-4 p-2 bg-gray-100 rounded"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            onClick={handleSavePassword}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Simpan Password
          </button>
        </>
      )}

    </div>
  );
};

export default ForgotPasswordCard;
