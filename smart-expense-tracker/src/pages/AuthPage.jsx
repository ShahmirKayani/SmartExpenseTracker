import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/dashboard"); // navigate after login
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a23",
        color: "white",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(0,0,0,0.85)",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Smart Expense Tracker
        </h1>
        <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#aaa" }}>
          {isLogin ? "Welcome back" : "Create your account"}
        </p>

        {/* Toggle buttons */}
        <div
          style={{
            display: "flex",
            marginBottom: "1.5rem",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: "0.6rem",
              border: "none",
              backgroundColor: isLogin ? "#007bff" : "#333",
              color: "white",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: "0.6rem",
              border: "none",
              backgroundColor: !isLogin ? "#007bff" : "#333",
              color: "white",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "1rem" }}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required={!isLogin}
                style={inputStyle}
              />
            </div>
          )}
          <div style={{ marginBottom: "1rem" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              style={inputStyle}
            />
          </div>
          {!isLogin && (
            <div style={{ marginBottom: "1rem" }}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required={!isLogin}
                style={inputStyle}
              />
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Switch and dashboard */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button
            onClick={toggleMode}
            style={{
              background: "none",
              color: "lightblue",
              border: "none",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>

          <div>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                width: "100%",
                padding: "0.7rem",
                backgroundColor: "#28a745",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "0.3rem",
  padding: "0.6rem",
  borderRadius: "5px",
  border: "1px solid #444",
  backgroundColor: "#111",
  color: "white",
};
