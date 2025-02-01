import React, { useState } from "react";
import axios from "axios";


const SISENSE_BACKEND_URL = "https://client-soo-backend.onrender.com"; // Backend API

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [sisenseUrl, setSisenseUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !tenantId || !sisenseUrl) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(${SISENSE_BACKEND_URL}/sisense/jwt, {
        params: { email, tenantId, returnUrl: sisenseUrl },
      });

      window.location.href = response.request.responseURL; // Redirect to Sisense

    } catch (err) {
      setError("Failed to authenticate. Please try again.");
      console.error("SSO Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Sisense SSO Login</h2>
        <input
          type="email"
          placeholder="Enter your Sisense email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Tenant ID"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Sisense URL (e.g., https://your-sisense.com)"
          value={sisenseUrl}
          onChange={(e) => setSisenseUrl(e.target.value)}
          className="input-field"
        />
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-button"
        >
          {loading ? "Authenticating..." : "Login with Sisense"}
        </button>
      </div>
    </div>
  );
};

export default Login;
