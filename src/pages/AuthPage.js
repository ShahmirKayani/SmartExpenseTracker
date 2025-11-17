import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    loginId: "", // username OR email for login
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN FLOW: username/email + password
      if (!formData.loginId || !formData.password) {
        alert("Please fill out all fields.");
        return;
      }

      // For demo: just store whatever they typed as "username"
      const usernameToStore = formData.loginId.trim() || "User";
      localStorage.setItem("username", usernameToStore);

      alert("Logged in!");
      navigate("/dashboard");
    } else {
      // REGISTER FLOW: name + email + password + confirm
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert("Please fill out all fields.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Choose username from name, fallback to email prefix
      const usernameFromName = formData.name.trim();
      const usernameFromEmail = formData.email.split("@")[0];
      const usernameToStore = usernameFromName || usernameFromEmail || "User";

      localStorage.setItem("username", usernameToStore);
      localStorage.setItem("email", formData.email);

      alert("Registered!");
      navigate("/dashboard");
    }
  };

  // ===== Frosted Neon UI =====

  const page = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #1e293b 0%, #020617 45%, #000 100%)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "28px",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  };

  const wrap = {
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  };

  const title = {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "4px",
    letterSpacing: "0.5px",
  };

  const tagline = {
    fontSize: "13px",
    opacity: 0.75,
    marginBottom: "18px",
  };

  const glowIcon = {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    margin: "0 auto 16px auto",
    background:
      "conic-gradient(from 210deg, #3b82f6, #6366f1, #22c55e, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    boxShadow: "0 0 40px rgba(59,130,246,0.45)",
  };

  const card = {
    width: "100%",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.88))",
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.35)",
    padding: "22px 24px",
    boxShadow:
      "0 25px 70px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.85)",
    backdropFilter: "blur(16px)",
  };

  const tabs = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "6px",
    marginBottom: "16px",
  };

  const tabBtn = (active) => ({
    border: "none",
    borderRadius: "10px",
    padding: "10px 0",
    cursor: "pointer",
    transition: "0.2s",
    color: active ? "#0f172a" : "white",
    background: active
      ? "linear-gradient(135deg,#3b82f6,#22c55e)"
      : "transparent",
    fontWeight: 700,
    letterSpacing: "0.4px",
  });

  const heading = {
    margin: "0 0 12px 0",
    opacity: 0.9,
    fontSize: "17px",
    textAlign: "left",
  };

  const form = {
    display: "grid",
    gap: "12px",
    marginTop: "6px",
  };

  const input = {
    background: "rgba(15,23,42,0.85)",
    border: "1px solid rgba(148,163,184,0.5)",
    color: "white",
    padding: "11px 13px",
    borderRadius: "12px",
    outline: "none",
    fontSize: "14px",
  };

  const submit = {
    background:
      "linear-gradient(135deg, #3b82f6, #6366f1, #22c55e)",
    color: "white",
    border: "none",
    padding: "11px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: "4px",
    fontSize: "14px",
    boxShadow: "0 10px 25px rgba(56,189,248,0.35)",
  };

  const helper = {
    textAlign: "center",
    marginTop: "12px",
    fontSize: "13px",
    opacity: 0.8,
  };

  const linkBtn = {
    background: "none",
    border: "none",
    color: "#93c5fd",
    cursor: "pointer",
    fontWeight: 700,
  };

  return (
    <div style={page}>
      <div style={wrap}>
        <div style={glowIcon}>🔐</div>

        <h1 style={title}>Smart Expense Tracker</h1>
        <p style={tagline}>Track smarter. Spend wiser.</p>

        <div style={card}>
          {/* Tabs */}
          <div style={tabs}>
            <button
              style={tabBtn(isLogin)}
              type="button"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              style={tabBtn(!isLogin)}
              type="button"
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <h3 style={heading}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h3>

          <form onSubmit={handleSubmit} style={form}>
            {isLogin ? (
              <>
                {/* LOGIN: Username or Email */}
                <input
                  style={input}
                  type="text"
                  name="loginId"
                  placeholder="Username or Email"
                  value={formData.loginId}
                  onChange={handleChange}
                  required
                />

                <input
                  style={input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <>
                {/* REGISTER: Full name + email + password + confirm */}
                <input
                  style={input}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  style={input}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  style={input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  style={input}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button type="submit" style={submit}>
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div style={helper}>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              style={linkBtn}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
