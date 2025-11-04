import React, { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? "Logged in!" : "Registered!");
  };

  //Styling
  const page = {
    minHeight: "100vh",
    backgroundColor: "#0a0a23",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  };

  const wrap = {
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  };

  const card = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  };

  const title = { fontSize: "26px", margin: 0 };
  const tagline = { fontSize: "14px", opacity: 0.8, margin: 0, marginTop: "4px" };

  const tabs = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "6px",
    marginTop: "14px",
    marginBottom: "14px",
  };

  const tabBtn = (active) => ({
    border: "none",
    borderRadius: "8px",
    padding: "10px 0",
    cursor: "pointer",
    color: active ? "#0a0a23" : "white",
    background: active ? "white" : "transparent",
    fontWeight: 700,
    letterSpacing: "0.2px",
  });

  const form = {
    display: "grid",
    gap: "10px",
    marginTop: "8px",
  };

  const input = {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "10px 12px",
    borderRadius: "10px",
    outline: "none",
  };

  const submit = {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: "4px",
  };

  const helper = {
    textAlign: "center",
    marginTop: "10px",
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
        {/*Logo/Brand*/}
        <h1 style={title}>Smart Expense Tracker (S.E.T)</h1>
        <p style={tagline}>Track smarter. Spend wiser.</p>

        {/*Auth Card*/}
        <div style={card}>
          {/* Tabs */}
          <div style={tabs}>
            <button
              style={tabBtn(isLogin)}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Login
            </button>
            <button
              style={tabBtn(!isLogin)}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Register
            </button>
          </div>

          {/*Heading*/}
          <h3 style={{ margin: "0 0 8px 0", opacity: 0.9 }}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h3>

          {/*Form*/}
          <form onSubmit={handleSubmit} style={form}>
            {!isLogin && (
              <input
                style={input}
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}

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

            {!isLogin && (
              <input
                style={input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button type="submit" style={submit}>
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/*Toggle helper*/}
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
