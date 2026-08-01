import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { handleChange } from "../utils/formHandles";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "../components/ErrorMessage";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(null);

    axiosClient
      .post("/auth/login/", formData)
      .then((response) => {
        const tokens = response.data;
        axiosClient.defaults.headers.Authorization = `Bearer ${tokens.access}`;
        login(tokens, {
          username: formData.username,
          authenticated: true,
          is_staff: true,
        });
        navigate("/admin/materials");
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setSending(false));
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="eyebrow text-gold-500 mb-3">▪ Admin Portal</p>
          <h1 className="font-serif text-3xl text-ink">Admin Login</h1>
          <p className="text-sm text-ink-soft mt-2">
            Enter your admin username and password to access the dashboard.
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-8">
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => handleChange(e, setFormData)}
                required
                className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange(e, setFormData)}
                required
                className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium py-3 rounded-full transition"
            >
              {sending ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
