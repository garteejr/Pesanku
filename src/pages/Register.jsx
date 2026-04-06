import Navbar from "../components/Navbar";
import RegisterCard from "../components/RegisterCard";
import bg from "../assets/bg.png";

function Register() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />
      <RegisterCard />
    </div>
  );
}

export default Register;