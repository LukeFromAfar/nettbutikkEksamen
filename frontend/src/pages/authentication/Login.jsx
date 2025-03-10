import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../hooks/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);

    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`,
      {
        email,
        password,
      },
      { withCredentials: true },
    ).then((res) => {
      console.log(res);
      setMessage(res.data.msg);
      if (res.status === 202) {
        window.location.replace("/");
      }
    }).catch((error) => {
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-1/3">
        <h1 className="pb-4 text-3xl text-center">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" className="w-full p-2 mb-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" className="w-full p-2 mb-3 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center mt-2">
            Sign In
          </button>
        </form>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:text-blue-700">
            Register
          </a>
        </p>
        <p className="mt-2 text-center text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
}