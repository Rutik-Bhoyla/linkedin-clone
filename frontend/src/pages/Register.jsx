import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      // Save token and user details in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Registered successfully!");
      navigate("/feed"); // redirect to feed page
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (

    <div className="w-full h-screen bg-zinc-100 flex justify-center items-center">
      <div
        className="min-w-96 bg-white flex flex-col rounded-2xl max-w-[25%] h-[65%] shadow-xl p-10 gap-8 justify-center
      "
      >
        <h1 className="text-4xl font-semibold">Register</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="w-full h-9 rounded-sm outline-blue-500 border p-3"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full h-9 rounded-sm outline-blue-500 border p-3"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full h-9 rounded-sm outline-blue-500 border p-3"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <a className="text-blue-700 font-semibold" href="#">
            Forgot password?
          </a>
          <button type="submit" className="w-full bg-blue-500 text-white text-md font-semibold rounded-sm py-2">
            Register
          </button>
        </form>
        <p className="text-red-600">{message}</p>
        <p>
          Already have an account?{" "}
          <a className="text-blue-700 font-semibold" href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
