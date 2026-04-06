import Navbar from "../components/Navbar";
import ForgotPasswordCard from "../components/ForgotPasswordCard";
import bg from "../assets/bg.png";

function ForgotPassword() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />
      <ForgotPasswordCard />
    </div>
  );
}

export default ForgotPassword;