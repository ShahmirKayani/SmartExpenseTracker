import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddIncome() {
  const navigate = useNavigate();

  // read username for greeting
  const username = localStorage.getItem("username") || "User";

  const createEmptyIncome = () => ({
    amount: "",
    source: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState(createEmptyIncome());
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [sources, setSources] = useState([
    "Salary",
    "Part-Time",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ]);

  const [customSource, setCustomSource] = useState("");
  const [isAddingSource, setIsAddingSource] = useState(false);

  // Load incomes from storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incomes")) || [];
    setIncomes(stored);
  }, []);

  const totalIncome = incomes.reduce(
    (sum, inc) => sum + (Number(inc.amount) || 0),
    0
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setMessage("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.source) {
      newErrors.source = "Source is required";
    }
    return newErrors;
  };

  const handleAddSource = () => {
    if (!customSource.trim()) {
      alert("Please enter a source name.");
      return;
    }

    const src = customSource.trim();
    if (!sources.includes(src)) {
      setSources([...sources, src]);
    }

    setFormData((prev) => ({ ...prev, source: src }));

    setCustomSource("");
    setIsAddingSource(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let updatedIncomes;
    if (editingIndex === null) {
      updatedIncomes = [...incomes, formData];
      setMessage("✅ Income added successfully!");
    } else {
      updatedIncomes = incomes.map((inc, idx) =>
        idx === editingIndex ? formData : inc
      );
      setMessage("✅ Income updated successfully!");
    }

    setIncomes(updatedIncomes);
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));

    setFormData(createEmptyIncome());
    setEditingIndex(null);
    setErrors({});

    // Sync dashboard
    window.dispatchEvent(new Event("storage"));

    setIsAddingSource(false);
    setCustomSource("");
  };

  const handleEdit = (index) => {
    setFormData(incomes[index]);
    setEditingIndex(index);
    setErrors({});
    setMessage("");
    setIsAddingSource(false);
    setCustomSource("");
  };

  const handleDelete = (index) => {
    const updated = incomes.filter((_, i) => i !== index);
    setIncomes(updated);
    localStorage.setItem("incomes", JSON.stringify(updated));

    setMessage("🗑️ Income deleted.");

    if (editingIndex === index) {
      setFormData(createEmptyIncome());
      setEditingIndex(null);
      setErrors({});
    }

    window.dispatchEvent(new Event("storage"));
  };

  // ========== UI STYLES (UNCHANGED) ==========
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
    maxWidth: "1100px",
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
      "conic-gradient(from 210deg, #22c55e, #0ea5e9, #6366f1, #22c55e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px rgba(59,130,246,0.45)",
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
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.4)",
    padding: "22px",
    boxShadow: "0 30px 80px rgba(15,23,42,0.9)",
    backdropFilter: "blur(16px)",
  };

  const summaryRow = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "18px",
  };

  const pillCard = {
    borderRadius: "14px",
    border: "1px solid rgba(148,163,184,0.35)",
    background:
      "radial-gradient(circle at top left, rgba(148,163,184,0.22), transparent 55%)",
    padding: "10px 12px",
    fontSize: "12px",
  };

  const pillLabel = { opacity: 0.7 };
  const pillValue = { fontSize: "16px", fontWeight: 600 };

  const heading = { fontSize: "18px", marginTop: "4px" };
  const subheading = { fontSize: "12px", opacity: 0.8 };

  const listItem = {
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.95))",
    padding: "9px 11px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    border: "1px solid rgba(148,163,184,0.4)",
    fontSize: "13px",
  };

  const incomeAmount = { fontWeight: 600, fontSize: "14px" };

  const incomeSourceChip = {
    fontSize: "11px",
    padding: "3px 8px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at top left, rgba(52,211,153,0.25), rgba(22,163,74,0.7))",
    border: "1px solid rgba(34,197,94,0.7)",
  };

  const actionsInline = { display: "flex", gap: "6px" };

  const editBtn = {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(52,211,153,0.8)",
    color: "rgba(187,247,208,1)",
    borderRadius: "8px",
    padding: "4px 9px",
    cursor: "pointer",
    fontSize: "11px",
  };

  const deleteBtn = {
    background: "rgba(30, 64, 175, 0.15)",
    border: "1px solid rgba(248,113,113,0.8)",
    color: "#fb7185",
    borderRadius: "8px",
    padding: "4px 9px",
    cursor: "pointer",
    fontSize: "11px",
  };

  const formWrapper = {
    marginTop: "16px",
    borderTop: "1px dashed rgba(148,163,184,0.4)",
    paddingTop: "14px",
  };

  const formStyles = { display: "grid", gap: "14px" };

  const formGroup = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  };

  const label = { fontSize: "13px", opacity: 0.9 };

  const inputStyle = (err) => ({
    background: "rgba(15,23,42,0.85)",
    border: `1px solid ${err ? "#fb7185" : "rgba(148,163,184,0.6)"}`,
    color: "white",
    padding: "9px 11px",
    borderRadius: "10px",
    flex: 1,
    outline: "none",
  });

  const selectStyle = {
    ...inputStyle(false),
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(22,163,74,0.9))",
    appearance: "none",
    zIndex: 9999,
  };

  const primaryButton = {
    background:
      "linear-gradient(135deg, #22c55e, #4ade80, #a3e635)",
    color: "black",
    border: "none",
    padding: "10px",
    borderRadius: "12px",
    fontWeight: 650,
    cursor: "pointer",
    width: "100%",
    fontSize: "14px",
    marginTop: "6px",
    boxShadow: "0 10px 25px rgba(22,163,74,0.4)",
  };

  const messageStyle = {
    fontSize: "13px",
    color: "#4ade80",
    textAlign: "center",
    marginTop: "8px",
  };

  const footerHint = {
    fontSize: "10px",
    opacity: 0.6,
    textAlign: "right",
    marginTop: "10px",
  };

  // =====================================
  // RENDER
  // =====================================
  return (
    <div style={page}>
      <div style={shell}>

        {/* Header */}
        <div style={header}>

          <div>
            <div style={brand}>
              <div style={glowIcon}>💰</div>
              Smart Expense Tracker
            </div>
            <div style={greeting}>Hi, {username}! 👋</div>
          </div>

          <div style={badge}>
            Income · {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Back to Dashboard */}
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

        {/* Main Card */}
        <div style={card}>
          <div style={summaryRow}>
            <div style={pillCard}>
              <div style={pillLabel}>Total Income</div>
              <div style={pillValue}>${totalIncome.toFixed(2)}</div>
            </div>

            <div style={pillCard}>
              <div style={pillLabel}>Entries</div>
              <div style={pillValue}>{incomes.length}</div>
            </div>

            <div style={pillCard}>
              <div style={pillLabel}>Mode</div>
              <div style={pillValue}>
                {editingIndex === null ? "Add" : "Edit"}
              </div>
            </div>
          </div>

          <div style={heading}>💵 Income</div>
          <p style={subheading}>
            Record your income streams. Everything updates your dashboard automatically.
          </p>

          {/* LIST */}
          {incomes.length > 0 &&
            incomes.map((income, index) => (
              <div key={index} style={listItem}>
                <div>
                  <div style={incomeAmount}>
                    +${Number(income.amount).toFixed(2)}{" "}
                    <span style={incomeSourceChip}>{income.source}</span>
                  </div>
                  <div style={{ opacity: 0.75, fontSize: "11px" }}>
                    {income.date}
                    {income.description ? ` • ${income.description}` : ""}
                  </div>
                </div>

                <div style={actionsInline}>
                  <button
                    style={editBtn}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          {/* FORM */}
          <div style={formWrapper}>
            <form onSubmit={handleSubmit} style={formStyles}>
              {/* Amount */}
              <div style={formGroup}>
                <label style={label}>Amount *</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  style={inputStyle(errors.amount)}
                />
              </div>

              {/* Source */}
              <div style={formGroup}>
                <label style={label}>Source *</label>

                {!isAddingSource ? (
                  <select
                    value={formData.source}
                    onChange={(e) => {
                      if (e.target.value === "add_new") {
                        setIsAddingSource(true);
                      } else {
                        handleChange("source", e.target.value);
                      }
                    }}
                    style={selectStyle}
                    required
                  >
                    <option value="">Select a source</option>
                    {sources.map((src) => (
                      <option key={src} value={src}>
                        {src}
                      </option>
                    ))}
                    <option value="add_new">➕ Add Custom Source</option>
                  </select>
                ) : (
                  <div style={{ display: "flex", gap: "10px", flex: 1 }}>
                    <input
                      type="text"
                      placeholder="New source"
                      value={customSource}
                      onChange={(e) =>
                        setCustomSource(e.target.value)
                      }
                      style={inputStyle(false)}
                    />
                    <button
                      type="button"
                      onClick={handleAddSource}
                      style={{
                        background:
                          "linear-gradient(135deg, #22c55e, #16a34a)",
                        border: "none",
                        padding: "8px 12px",
                        color: "white",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "12px",
                      }}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Date */}
              <div style={formGroup}>
                <label style={label}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    handleChange("date", e.target.value)
                  }
                  style={inputStyle(false)}
                />
              </div>

              {/* Description */}
              <div style={formGroup}>
                <label style={label}>Description</label>
                <input
                  type="text"
                  placeholder="Optional note"
                  value={formData.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                  style={inputStyle(false)}
                />
              </div>

              <button type="submit" style={primaryButton}>
                {editingIndex === null
                  ? "Save Income"
                  : "Update Income"}
              </button>
            </form>

            {message && <p style={messageStyle}>{message}</p>}
          </div>

          <div style={footerHint}>
            Stored locally • Auto-syncs with dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
