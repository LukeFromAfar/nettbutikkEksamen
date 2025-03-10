import { useState } from "react";
import axios from "axios";


export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("register");
    // console.log(email, password, repeatPassword);
    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`,
      {
        email,
        username,
        password,
        repeatPassword,
      },
      { withCredentials: true },
    ).then((res) => {
      setMessage(res.data.message);
      if(res.status == 202) {window.location.replace("/")}
    }, 500);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-1/3">
        <h1 className="pb-4 text-3xl text-center">Register</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" className="w-full p-2 mb-3 border rounded" onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <label>
            Email:
            <input type="email" className="w-full p-2 mb-3 border rounded" onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
            Password:
            <input type="password" className="w-full p-2 mb-3 border rounded" onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <label>
            Confirm Password:
            <input type="password" className="w-full p-2 mb-3 border rounded" onChange={(e) => setRepeatPassword(e.target.value)}/>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center mt-2"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-500 hover:text-blue-700">
            Login
          </a>
        </p>
      </div>
      {message ? <div>{message}</div> : <div></div>}
    </div>
  );
}
