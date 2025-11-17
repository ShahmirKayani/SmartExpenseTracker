import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetBudget() {
  const navigate = useNavigate();

  // Greeting username
  const username = localStorage.getItem("username") || "User";

  // Budget state
  const [budget, setBudget] = useState({
    monthlyLimit: "",
    warningPercent: 80,
    note: "",
  });

  const [message, setMessage] = useState("");

  // Load saved settings
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("budgetSettings"));
    if (stored) setBudget(stored);
  }, []);

  const handleChange = (field, value) => {
    setBudget((prev) => ({
      ...prev,
      [field]: value,
    }));
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!budget.monthlyLimit || Number(budget.monthlyLimit) <= 0) {
      alert("Please enter a valid monthly budget.");
      return;
    }

    localStorage.setItem("budgetSettings", JSON.stringify(budget));
    setMessage("✅ Budget settings saved successfully!");

    // Sync dashboard
    window.dispatchEvent(new Event("storage"));
  };

  // ========= UI STYLE (unchanged) ==========
  const page = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #1e293b 0, #020617 40%, #000 100%)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    padding: "28px",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  };

  const shell = {
    width: "100%",
    maxWidth: "900px",
  };

  const header = {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const brand = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "24px",
    fontWeight: 700,
  };

  const glowIcon = {
    width: "46px",
    height: "46px",
    borderRadius: "16px",
    background:
      "conic-gradient(from 210deg, #f97316, #eab308, #22c55e, #f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px rgba(249,115,22,0.45)",
    fontSize: "22px",
  };

  const badge = {
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.7)",
  };

  const greeting = {
    fontSize: "14px",
    opacity: 0.85,
    marginTop: "4px",
  };

  const card = {
    width: "100%",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(15,23,42,0.9))",
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.4)",
    padding: "22px 22px 18px",
    boxShadow:
      "0 30px 80px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.8)",
    backdropFilter: "blur(16px)",
  };

  const heading = {
    fontSize: "18px",
    marginBottom: "4px",
  };

  const subheading = {
    fontSize: "12px",
    opacity: 0.8,
  };

  const pillRow = {
    display: "flex",
    gap: "10px",
    marginTop: "14px",
    marginBottom: "12px",
    flexWrap: "wrap",
  };

  const pill = {
    borderRadius: "14px",
    border: "1px solid rgba(148,163,184,0.35)",
    padding: "10px 12px",
    fontSize: "12px",
    background:
      "radial-gradient(circle at top left, rgba(234,179,8,0.18), transparent 55%)",
  };

  const pillLabel = { opacity: 0.7 };
  const pillValue = { fontSize: "16px", fontWeight: 600 };

  const formStyles = {
    display: "grid",
    gap: "16px",
    marginTop: "14px",
  };

  const formGroup = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const label = {
    fontSize: "13px",
    opacity: 0.9,
  };

  const inputStyle = {
    background: "rgba(15,23,42,0.85)",
    border: "1px solid rgba(148,163,184,0.6)",
    color: "white",
    padding: "9px 11px",
    borderRadius: "10px",
    fontSize: "13px",
    outline: "none",
  };

  const slider = { width: "100%" };

  const textarea = {
    ...inputStyle,
    minHeight: "70px",
    resize: "vertical",
  };

  const primaryButton = {
    background:
      "linear-gradient(135deg, #f97316, #eab308, #22c55e)",
    color: "#020617",
    border: "none",
    padding: "10px",
    borderRadius: "12px",
    fontWeight: 650,
    cursor: "pointer",
    width: "100%",
    fontSize: "14px",
    marginTop: "4px",
    boxShadow: "0 10px 25px rgba(234,179,8,0.45)",
  };

  const messageStyle = {
    fontSize: "13px",
    color: "#4ade80",
    textAlign: "center",
    marginTop: "8px",
  };

  const hint = {
    fontSize: "11px",
    opacity: 0.75,
    marginTop: "6px",
    textAlign: "center",
  };

  const footerHint = {
    fontSize: "10px",
    opacity: 0.6,
    textAlign: "right",
    marginTop: "10px",
  };

  // ========= JSX ==========
  return (
    <div style={page}>
      <div style={shell}>

        {/* Header */}
        <div style={header}>

          <div>
            <div style={brand}>
              <div style={glowIcon}>📊</div>
              Smart Expense Tracker
            </div>
            <div style={greeting}>Hi, {username}! 👋</div>
          </div>

          <div style={badge}>
            Budgets · {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginBottom: "14px",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            padding: "8px 12px",
            border: "1px solid rgba(148,163,184,0.4)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            backdropFilter: "blur(6px)",
          }}
        >
          ← Back to Dashboard
        </button>

        {/* Card */}
        <div style={card}>
          <h2 style={heading}>Set Monthly Budget & Alerts</h2>
          <p style={subheading}>
            Define your monthly spending limit and alert threshold.
          </p>

          {/* Summary Pills */}
          <div style={pillRow}>
            <div style={pill}>
              <div style={pillLabel}>Monthly Limit</div>
              <div style={pillValue}>
                {budget.monthlyLimit
                  ? `$${Number(budget.monthlyLimit).toFixed(2)}`
                  : "Not set"}
              </div>
            </div>

            <div style={pill}>
              <div style={pillLabel}>Alert Threshold</div>
              <div style={pillValue}>{budget.warningPercent}%</div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={formStyles}>
            {/* Monthly limit */}
            <div style={formGroup}>
              <label style={label}>Monthly Budget Limit (USD) *</label>
              <input
                type="number"
                placeholder="e.g., 2000"
                value={budget.monthlyLimit}
                onChange={(e) =>
                  handleChange("monthlyLimit", e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* Slider */}
            <div style={formGroup}>
              <label style={label}>Warning Threshold (%)</label>
              <input
                type="range"
                min="50"
                max="100"
                value={budget.warningPercent}
                onChange={(e) =>
                  handleChange("warningPercent", Number(e.target.value))
                }
                style={slider}
              />
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                Alert me at <strong>{budget.warningPercent}%</strong> of my budget.
              </div>
            </div>

            {/* Notes */}
            <div style={formGroup}>
              <label style={label}>Note (optional)</label>
              <textarea
                placeholder="E.g., Save extra this month, avoid eating out…"
                value={budget.note}
                onChange={(e) => handleChange("note", e.target.value)}
                style={textarea}
              />
            </div>

            <button type="submit" style={primaryButton}>
              Save Budget Settings
            </button>
          </form>

          {message && <p style={messageStyle}>{message}</p>}

          <p style={hint}>
            These settings sync automatically with your Dashboard.
          </p>

          <div style={footerHint}>
            Stored locally as <code>budgetSettings</code>
          </div>
        </div>
      </div>
    </div>
  );
}
