import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/auth.css";
import { loginUser } from "../utils/auth";
import { apiUrl } from "../utils/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const user = data.user || data;
      const userRole = user?.role || "student";
      loginUser({ ...user, role: userRole });

      navigate("/");
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb--one" aria-hidden="true" />
      <div className="auth-orb auth-orb--two" aria-hidden="true" />
      <div className="auth-bg-grid" aria-hidden="true" />

      <div className="container auth-grid">
        <section className="auth-copy">
          <div className="auth-kicker">
            <i className="bi bi-shield-check" aria-hidden="true" />
            Examly workspace
          </div>
          <h1>
            Your exams.
            <span className="accent"> One calm space.</span>
          </h1>
          <p className="auth-copy-note">Sign in and get straight to your dashboard.</p>
          <div className="auth-mini-features">
            <span><i className="bi bi-lightning-charge-fill" /> Fast access</span>
            <span><i className="bi bi-bar-chart-fill" /> Live results</span>
            <span><i className="bi bi-lock-fill" /> Secure</span>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card-body">
            <div className="auth-icon">
              <i className="bi bi-person-circle" aria-hidden="true" />
            </div>
            <h2>Sign In</h2>
            <p className="auth-subtitle">Continue to your workspace.</p>

            <div className="auth-form">
              <div className="auth-field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="auth-alert error">{error}</div>}

              <button className="auth-submit" onClick={handleLogin} disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </div>

            <p className="auth-switch">
              New here? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
