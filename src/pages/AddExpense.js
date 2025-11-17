import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const navigate = useNavigate();

  const createEmptyExpense = () => ({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState(createEmptyExpense());
  const [editingIndex, setEditingIndex] = useState(null);

  const [categories, setCategories] = useState([
    "Food", "Transport", "Entertainment", "Shopping",
    "Bills", "Healthcare", "Other",
  ]);

  const [customCategory, setCustomCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // username
  const username =
    localStorage.getItem("username") ||
    localStorage.getItem("email") ||
    "User";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
  }, []);

  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setMessage("");
  };

  const handleAddCategory = () => {
    if (!customCategory.trim()) return alert("Enter category");

    const newCat = customCategory.trim();
    if (!categories.includes(newCat)) {
      setCategories((prev) => [...prev, newCat]);
    }

    setFormData((prev) => ({ ...prev, category: newCat }));
    setCustomCategory("");
    setIsAddingCategory(false);
  };

  const validate = () => {
    const e = {};
    if (!formData.amount || Number(formData.amount) <= 0)
      e.amount = "Amount must be greater than 0";
    if (!formData.category) e.category = "Category is required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    let updated;
    if (editingIndex === null) {
      updated = [...expenses, formData];
      setMessage("✅ Expense added!");
    } else {
      updated = expenses.map((exp, i) =>
        i === editingIndex ? formData : exp
      );
      setMessage("✅ Expense updated!");
    }

    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setFormData(createEmptyExpense());
    setEditingIndex(null);
    setErrors({});
    setIsAddingCategory(false);
  };

  const handleEdit = (i) => {
    setFormData(expenses[i]);
    setEditingIndex(i);
    setErrors({});
    setMessage("");
    setIsAddingCategory(false);
  };

  const handleDelete = (i) => {
    const updated = expenses.filter((_, idx) => idx !== i);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setMessage("🗑️ Expense deleted.");
  };

  // --- SHARED UI STYLES (matches AddIncome header) ---

  const page = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #1e293b 0, #020617 45%, #000 100%)",
    color: "white",
    padding: "24px",
    display: "flex",
    justifyContent: "center",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  };

  const shell = {
    width: "100%",
    maxWidth: "1100px",
  };

  const appHeader = {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const appTitle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "22px",
    fontWeight: 700,
  };

  const appGlow = {
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

  const appBadge = {
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.7)",
  };

  const backButton = {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "14px",
    fontSize: "13px",
  };

  // ---- OLD AddExpense card styling (unchanged) ----
  const card = {
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
    padding: "10px 12px",
    background:
      "radial-gradient(circle at top left, rgba(148,163,184,0.22), transparent 55%)",
  };

  const pillLabel = { opacity: 0.7, fontSize: "12px" };
  const pillValue = { fontSize: "16px", fontWeight: 600 };

  const heading = { fontSize: "18px", marginBottom: "2px" };
  const subheading = { fontSize: "12px", opacity: 0.8 };

  const summaryLine = {
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.95))",
    padding: "9px 11px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    border: "1px solid rgba(148,163,184,0.4)",
    marginBottom: "8px",
  };

  const chipAmount = { fontWeight: 600 };
  const chipCategory = {
    fontSize: "11px",
    padding: "3px 8px",
    marginLeft: "6px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.25), rgba(30,64,175,0.6))",
    border: "1px solid rgba(59,130,246,0.7)",
  };

  const editBtn = {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(129,140,248,0.8)",
    color: "rgba(191,219,254,1)",
    borderRadius: "8px",
    padding: "4px 9px",
    cursor: "pointer",
    fontSize: "11px",
  };

  const deleteBtn = {
    background: "rgba(30,64,175,0.15)",
    border: "1px solid rgba(248,113,113,0.8)",
    color: "#fb7185",
    borderRadius: "8px",
    padding: "4px 9px",
    cursor: "pointer",
    fontSize: "11px",
  };

  const inputStyle = (err) => ({
    background: "rgba(15,23,42,0.85)",
    border: `1px solid ${err ? "#fb7185" : "rgba(148,163,184,0.6)"}`,
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    outline: "none",
  });

  const selectStyle = {
    ...inputStyle(false),
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,64,175,0.9))",
    appearance: "none",
  };

  const submitBtn = {
    background:
      "linear-gradient(135deg, #3b82f6, #6366f1, #22c55e)",
    padding: "10px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    marginTop: "8px",
  };

  return (
    <div style={page}>
      <div style={shell}>

        {/* MATCHED HEADER (SAME AS AddIncome) */}
        <div style={appHeader}>
          <div style={appTitle}>
            <div style={appGlow}>💡</div>
            <div>
              <div>Smart Expense Tracker</div>
              <div style={{ fontSize: "11px", opacity: 0.75 }}>
                Track your expenses • Auto-syncs with dashboard
              </div>
            </div>
          </div>
          <div style={appBadge}>
            {new Date().toLocaleDateString()} • v1.0
          </div>
        </div>

        {/* HI USER */}
        <div style={{ marginBottom: "6px", opacity: 0.9 }}>
          Hi, <strong>{username}</strong> 👋
        </div>

        {/* BACK TO DASHBOARD */}
        <button style={backButton} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        {/* CARD */}
        <div style={card}>
          {/* Summary */}
          <div style={summaryRow}>
            <div style={pillCard}>
              <div style={pillLabel}>Total Tracked</div>
              <div style={pillValue}>${totalAmount.toFixed(2)}</div>
            </div>

            <div style={pillCard}>
              <div style={pillLabel}>Entries</div>
              <div style={pillValue}>{expenses.length}</div>
            </div>

            <div style={pillCard}>
              <div style={pillLabel}>Mode</div>
              <div style={pillValue}>
                {editingIndex === null ? "Add" : "Edit"}
              </div>
            </div>
          </div>

          {/* Section Title */}
          <div style={heading}>💳 Expenses</div>
          <p style={subheading}>
            Log each expense with category and notes. Edit or delete anytime.
          </p>

          {/* LIST */}
          {expenses.map((expense, index) => (
            <div key={index} style={summaryLine}>
              <div>
                <span style={chipAmount}>
                  ${Number(expense.amount).toFixed(2)}
                </span>
                <span style={chipCategory}>{expense.category}</span>
                <div style={{ fontSize: "11px", opacity: 0.7 }}>
                  {expense.date}
                  {expense.description ? ` • ${expense.description}` : ""}
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <button style={editBtn} onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button style={deleteBtn} onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* FORM */}
          <div style={{ marginTop: "14px", borderTop: "1px dashed rgba(255,255,255,0.2)", paddingTop: "14px" }}>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
              {/* Amount */}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center" }}>
                <label>Amount *</label>
                <div>
                  <input
                    type="number"
                    placeholder="0.00"
                    style={inputStyle(errors.amount)}
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                  />
                  {errors.amount && (
                    <div style={{ color: "#fb7185", fontSize: "12px" }}>
                      {errors.amount}
                    </div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center" }}>
                <label>Category *</label>
                <div>
                  {!isAddingCategory ? (
                    <select
                      style={selectStyle}
                      value={formData.category}
                      onChange={(e) => {
                        if (e.target.value === "add_new") setIsAddingCategory(true);
                        else handleChange("category", e.target.value);
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="add_new">➕ Add Custom Category</option>
                    </select>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="Enter category"
                        style={inputStyle(false)}
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        style={{
                          background:
                            "linear-gradient(135deg, #22c55e, #16a34a)",
                          padding: "8px 10px",
                          borderRadius: "12px",
                          color: "white",
                          border: "none",
                        }}
                      >
                        Add
                      </button>
                    </div>
                  )}
                  {errors.category && (
                    <div style={{ color: "#fb7185", fontSize: "12px" }}>
                      {errors.category}
                    </div>
                  )}
                </div>
              </div>

              {/* Date */}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center" }}>
                <label>Date</label>
                <input
                  type="date"
                  style={inputStyle(false)}
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>

              {/* Description */}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center" }}>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Optional note"
                  style={inputStyle(false)}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <button type="submit" style={submitBtn}>
                {editingIndex === null ? "Save Expense" : "Update Expense"}
              </button>
            </form>

            {message && (
              <div style={{ marginTop: "8px", color: "#4ade80", textAlign: "center" }}>
                {message}
              </div>
            )}

            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "6px", textAlign: "center" }}>
              {editingIndex === null
                ? "Tip: Track small expenses to see patterns."
                : "You're editing an expense."}
            </div>
          </div>

          <div style={{ fontSize: "10px", opacity: 0.6, textAlign: "right", marginTop: "12px" }}>
            Data stored locally • Syncs with Dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
