import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [sisenseUrl, setSisenseUrl] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
     try {
      const response = await axios.post("https://client-soo-backend.onrender.com/api/login", {
        username,
        password,
      });

      if (response.data.sisenseSSOUrl) {
        setSisenseUrl(response.data.sisenseSSOUrl);
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-xl w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sisense Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {sisenseUrl && (
          <div className="mt-4 text-center">
            <a
              href={sisenseUrl}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Sisense Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
