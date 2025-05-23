import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Tambahkan autentikasi ke backend
    console.log("Logging in with:", email, password);
    navigate("/"); // Redirect setelah login berhasil
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Login to Ultraverse Chronicle
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-400">
              Belum punya akun?{" "}
              <button onClick={() => navigate("/register")} className="text-red-500 hover:underline">
                Daftar
              </button>
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
