import reactsvg from "../assets/react.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/sign-in";

  return (
    <nav className="flex w-full justify-between p-4 bg-blue-300 fixed">
      <Link to="/">
        <img src={reactsvg} alt="Logo" className="w-8 h-8" />{" "}
      </Link>
      <h1 className="text-2xl font-bold">[Nettbutikk]</h1>
      <Link
        to={isLoginPage ? "/sign-up" : "/sign-in"}
        className="text-btn btn-primary hover:text-blue-700" // Added hover effect
      >
        {isLoginPage ? "Register" : "Login"}
      </Link>
    </nav>
  );
}
