export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-1/3">
        <h1 className="pb-4 text-3xl text-center">Login</h1>
        <form className="flex flex-col">
          <label>
            Email:
            <input type="email" className="w-full p-2 mb-3 border rounded" />
          </label>
          <label>
            Password:
            <input type="password" className="w-full p-2 mb-3 border rounded" />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center mt-2"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:text-blue-700">
            Register
          </a>
        </p>
        <p className="mt-2 text-center text-sm">
          <a
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-700"
          >
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
}
