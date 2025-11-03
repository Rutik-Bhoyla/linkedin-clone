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
   const goToMyPosts = () => {
    navigate("/myposts"); // Redirect to MyPosts page
  };

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-500 shadow-md px-50 py-3 flex justify-between items-center fixed top-0 left-0">
      {/* Logo / App Name */}
      
        <h1 className="text-blue-700 font-bold text-2xl"><a href="/">LinkedIn Clone</a></h1>

      {/* Right side */}
      <div className="flex items-center gap-5">
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
    </nav>
  );
};

export default Navbar;
