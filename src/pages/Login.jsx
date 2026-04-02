import Navbar from "../components/Navbar";
import LoginCard from "../components/LoginCard";
import bg from "../assets/bg.png";

function Login() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />
      <LoginCard />
    </div>
  );
}

export default Login;
