import React, { useEffect, useState } from "react";

export default function Dashboard() {
  //Sample data
  const expenses = [
    { category: "Food & Dining", amount: 13000, color: "#ef4444" },
    { category: "Cars/Bikes", amount: 70000, color: "#22c55e" },
    { category: "Entertainment", amount: 50000, color: "#3b82f6" },
    { category: "Utilities", amount: 7000, color: "#a855f7" },
    { category: "Crypto", amount: 13000, color: "#facc15" },
    { category: "Groceries", amount: 5000, color: "#ec4899" },
  ];

  const income = [
    { source: "Business", amount: 7000000, date: "Nov 1, 2025" },
    { source: "Crypto", amount: 42350, date: "Nov 3, 2025" },
    { source: "Rentals", amount: 30000, date: "Nov 7, 2025" },
    { source: "Social Media", amount: 120000, date: "Nov 15, 2025" },
    { source: "Haters Tax", amount: 21000, date: "Nov 1, 2025" },
  ];

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);

  //Editable Budget
  const [budget, setBudget] = useState(150000);
  const [draftBudget, setDraftBudget] = useState("150000");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("set_budget");
      if (saved) {
        const parsed = Number(saved);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setBudget(parsed);
          setDraftBudget(String(parsed));
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("set_budget", String(budget));
    } catch {}
  }, [budget]);

  const safeBudget = Math.max(0, Number(budget) || 0);
  const budgetUsedPct =
    safeBudget === 0 ? 0 : Math.min(100, (totalExpenses / safeBudget) * 100);
  const remaining = Math.max(0, safeBudget - totalExpenses);

  //Styling
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#0a0a23",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  };

  const grid3 = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "1000px",
    marginBottom: "24px",
  };

  const grid2 = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "1000px",
  };

  const card = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "16px",
  };

  const inputRow = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginTop: "10px",
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "8px 10px",
    borderRadius: "8px",
    width: "140px",
  };

  const btnStyle = {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const smallMuted = { fontSize: "12px", opacity: 0.7 };

  //Component
  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>
        Smart Expense Tracker
      </h1>
      <p style={{ opacity: 0.7, marginBottom: "24px" }}>
        Track smarter. Spend wiser.
      </p>

      {/*Summary Cards*/}
      <div style={grid3}>
        <div style={card}>
          <h3>Total Income</h3>
          <p style={{ fontSize: "24px", color: "#22c55e" }}>
            ${totalIncome.toLocaleString()}
          </p>
          <p style={smallMuted}>This month</p>
        </div>

        <div style={card}>
          <h3>Total Expenses</h3>
          <p style={{ fontSize: "24px", color: "#ef4444" }}>
            ${totalExpenses.toLocaleString()}
          </p>
          <p style={smallMuted}>This month</p>
        </div>

        <div style={card}>
          <h3>Net Balance</h3>
          <p style={{ fontSize: "24px", color: "#3b82f6" }}>
            ${(totalIncome - totalExpenses).toLocaleString()}
          </p>
          <p style={smallMuted}>Available</p>
        </div>
      </div>

      {/*Expenses and Income*/}
      <div style={grid2}>
        <div style={card}>
          <h3>Expenses by Category</h3>
          {expenses.map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: e.color,
                  }}
                />
                <span>{e.category}</span>
              </div>
              <span>${e.amount}</span>
            </div>
          ))}
        </div>

        <div style={card}>
          <h3>Income Sources</h3>
          {income.map((i, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "8px",
                marginTop: "6px",
              }}
            >
              <div>
                <p style={{ margin: 0 }}>{i.source}</p>
                <small style={smallMuted}>{i.date}</small>
              </div>
              <strong style={{ color: "#22c55e" }}>+${i.amount}</strong>
            </div>
          ))}
        </div>
      </div>

      {/*Budget Section (Editable)*/}
      <div
        style={{
          ...card,
          marginTop: "24px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <h3>Monthly Budget</h3>
        <p style={smallMuted}>Track your spending against your budget</p>

        {/* Editable row */}
        <div style={inputRow}>
          <label htmlFor="budget" style={{ fontSize: "14px" }}>
            Set Budget ($):
          </label>
          <input
            id="budget"
            type="number"
            min="0"
            value={draftBudget}
            onChange={(e) => setDraftBudget(e.target.value)}
            style={inputStyle}
            placeholder="e.g., 150000"
          />
          <button
            style={btnStyle}
            onClick={() => {
              const v = Number(draftBudget);
              if (Number.isNaN(v) || v < 0) return;
              setBudget(v);
            }}
          >
            Save
          </button>
          <button
            style={{ ...btnStyle, background: "rgba(255,255,255,0.15)" }}
            onClick={() => {
              setBudget(150000);
              setDraftBudget("150000");
            }}
          >
            Reset
          </button>
        </div>

        {/*Progress*/}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginTop: "14px",
            marginBottom: "6px",
          }}
        >
          <span>Budget Progress</span>
          <span>
            ${totalExpenses} / ${safeBudget}
          </span>
        </div>

        <div
          style={{
            height: "12px",
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              width: `${budgetUsedPct}%`,
              height: "100%",
              background: "#22c55e",
              transition: "width 200ms linear",
            }}
          />
        </div>

        <p style={{ fontSize: "13px", opacity: 0.7 }}>
          {budgetUsedPct.toFixed(1)}% used • ${remaining} remaining
        </p>
      </div>
    </div>
  );
}
