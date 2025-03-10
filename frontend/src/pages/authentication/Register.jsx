export default function Register() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-1/3">
        <h1 className="pb-4 text-3xl text-center">Register</h1>
        <form className="flex flex-col">
          <label>
            Username:
            <input type="text" className="w-full p-2 mb-3 border rounded" />
          </label>
          <label>
            Email:
            <input type="email" className="w-full p-2 mb-3 border rounded" />
          </label>
          <label>
            Password:
            <input type="password" className="w-full p-2 mb-3 border rounded" />
          </label>
          <label>
            Confirm Password:
            <input type="password" className="w-full p-2 mb-3 border rounded" />
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
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
