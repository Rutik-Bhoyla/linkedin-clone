import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

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

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center fixed top-0 left-0">
      {/* Logo / App Name */}
      <h1
        onClick={() => navigate("/feed")}
        className="text-xl font-bold text-blue-600 cursor-pointer"
      >
        LinkedIn Clone
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {user && <p className="font-medium">Hi, {user.name}</p>}

        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
