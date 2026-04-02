import logo from "../assets/icon.svg";

function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-full p-2">
      <div className="flex items-center gap-2 text-black font-semibold text-base">
        
        <img 
          src={logo} 
          alt="Pesanku Logo"
          className="w-8 h-8 object-contain"
        />

        <h1 className="font-[Poppins] text-base font-semibold">
          Pesanku
        </h1>

      </div>
    </div>
  );
}

export default Navbar;
