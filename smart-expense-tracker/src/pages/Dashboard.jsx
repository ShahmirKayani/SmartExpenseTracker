import React from "react";

export default function Dashboard() {
  const expenses = [
    { category: "Food & Dining", amount: 450 },
    { category: "Transportation", amount: 280 },
    { category: "Entertainment", amount: 180 },
    { category: "Utilities", amount: 320 },
  ];

  const income = [
    { source: "Salary", amount: 5000, date: "Nov 1, 2025" },
    { source: "Freelance", amount: 800, date: "Nov 15, 2025" },
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const budget = 4000;
  const budgetUsed = (totalExpenses / budget) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a23",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Smart Expense Tracker
      </h1>
      <p style={{ textAlign: "center", marginBottom: "2rem", color: "#aaa" }}>
        Your financial overview at a glance
      </p>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Income</h3>
          <p style={{ fontSize: "1.5rem", color: "lightgreen" }}>
            ${totalIncome.toLocaleString()}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Total Expenses</h3>
          <p style={{ fontSize: "1.5rem", color: "tomato" }}>
            ${totalExpenses.toLocaleString()}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Net Balance</h3>
          <p style={{ fontSize: "1.5rem", color: "#00e6e6" }}>
            ${(totalIncome - totalExpenses).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Expenses and Income */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {/* Expenses */}
        <div style={cardStyle}>
          <h3>Expenses by Category</h3>
          {expenses.map((exp, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #333",
                padding: "0.5rem 0",
              }}
            >
              <span>{exp.category}</span>
              <span>${exp.amount}</span>
            </div>
          ))}
        </div>

        {/* Income */}
        <div style={cardStyle}>
          <h3>Income Sources</h3>
          {income.map((inc, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #333",
                padding: "0.5rem 0",
              }}
            >
              <div>
                <p style={{ margin: 0 }}>{inc.source}</p>
                <small style={{ color: "#aaa" }}>{inc.date}</small>
              </div>
              <strong style={{ color: "lightgreen" }}>+${inc.amount}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Progress */}
      <div style={{ ...cardStyle, marginTop: "2rem" }}>
        <h3>Monthly Budget</h3>
        <p>
          ${totalExpenses} / ${budget} used
        </p>
        <div
          style={{
            background: "#222",
            borderRadius: "5px",
            overflow: "hidden",
            height: "15px",
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              background: "lightblue",
              width: `${budgetUsed}%`,
              height: "100%",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p style={{ fontSize: "0.9rem", marginTop: "0.5rem", color: "#aaa" }}>
          {budgetUsed.toFixed(1)}% of budget used • ${budget - totalExpenses} remaining
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "rgba(255,255,255,0.05)",
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};
