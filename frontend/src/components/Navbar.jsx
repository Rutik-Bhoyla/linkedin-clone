import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToMyPosts = () => {
    navigate("/myposts");
    setMenuOpen(false); // close after clicking
  };

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-500 shadow-md px-4 py-3 flex justify-between items-center fixed top-0 left-0 z-50">
      
      {/* Logo */}
      <h1 className="text-blue-700 font-bold text-2xl">
        <a href="/">LinkedIn Clone</a>
      </h1>

      {/* Hamburger button (Mobile only) */}
      <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5">
        {user && <p className="font-medium text-white">Hi, {user.name}</p>}

        <button
          onClick={goToMyPosts}
          className="px-4 py-1 bg-zinc-600 text-white font-semibold rounded-2xl hover:bg-blue-400 transition"
        >
          My Posts
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu (Slide Down) */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-zinc-800 flex flex-col items-center gap-4 py-4 md:hidden transition">
          {user && <p className="font-medium text-white">Hi, {user.name}</p>}

          <button
            onClick={goToMyPosts}
            className="px-4 py-1 bg-zinc-600 text-white font-semibold rounded-2xl hover:bg-blue-400 transition w-40"
          >
            My Posts
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-1 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-400 transition w-40"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
