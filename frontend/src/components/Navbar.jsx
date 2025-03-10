// src/components/Navbar.jsx
import reactsvg from "../assets/react.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/authContext";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const isLoginPage = location.pathname === "/sign-in";

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex w-full justify-between p-4 bg-blue-300 fixed">
      <Link to="/">
        <img src={reactsvg} alt="Logo" className="w-8 h-8" />{" "}
      </Link>
      <h1 className="text-2xl font-bold">
        [Nettbutikk] {user && `- ${user.username}`}
      </h1>
      <div className="flex items-center gap-4">
        {user && user.role === "admin" && (
          <button
            onClick={() => navigate("/add-clothing")}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Add Clothing
          </button>
        )}
        {user ? (
          <button
            onClick={handleLogout}
            className="text-btn btn-primary hover:text-blue-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to={isLoginPage ? "/sign-up" : "/sign-in"}
            className="text-btn btn-primary hover:text-blue-700"
          >
            {isLoginPage ? "Register" : "Login"}
          </Link>
        )}
      </div>
    </nav>
  );
}