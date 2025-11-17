import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // ---------- STATE ----------

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const [budget, setBudget] = useState(150000);
  const [draftBudget, setDraftBudget] = useState("150000");

  const [username, setUsername] = useState("User");

  // ---------- LOAD DATA FROM LOCALSTORAGE ----------

  useEffect(() => {
    try {
      // incomes
      const storedIncomes =
        JSON.parse(localStorage.getItem("incomes")) || [];
      setIncomes(storedIncomes);

      // expenses
      const storedExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];
      setExpenses(storedExpenses);

      // username
      const storedUsername = localStorage.getItem("username");
      if (storedUsername && storedUsername.trim() !== "") {
        setUsername(storedUsername.trim());
      }

      // budget from budgetSettings (new) or set_budget (old)
      const rawSettings = localStorage.getItem("budgetSettings");
      if (rawSettings) {
        const settings = JSON.parse(rawSettings);
        if (
          settings &&
          settings.monthlyLimit &&
          Number(settings.monthlyLimit) > 0
        ) {
          const val = Number(settings.monthlyLimit);
          setBudget(val);
          setDraftBudget(String(val));
          return; // use new style
        }
      }

      // fallback legacy key if present
      const saved = localStorage.getItem("set_budget");
      if (saved) {
        const parsed = Number(saved);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setBudget(parsed);
          setDraftBudget(String(parsed));
        }
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  }, []);

  // Keep set_budget updated if budget changes (legacy support)
  useEffect(() => {
    try {
      localStorage.setItem("set_budget", String(budget));
    } catch {}
  }, [budget]);

  // ---------- DERIVED VALUES ----------

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );
  const totalIncome = incomes.reduce(
    (sum, i) => sum + (Number(i.amount) || 0),
    0
  );

  const safeBudget = Math.max(0, Number(budget) || 0);
  const budgetUsedPct =
    safeBudget === 0
      ? 0
      : Math.min(100, (totalExpenses / safeBudget) * 100);
  const remaining = Math.max(0, safeBudget - totalExpenses);
  const netBalance = totalIncome - totalExpenses;

  // group expenses by category
  const categoryMap = {};
  expenses.forEach((e) => {
    const cat = e.category || "Uncategorized";
    const amt = Number(e.amount) || 0;
    categoryMap[cat] = (categoryMap[cat] || 0) + amt;
  });

  const categoryEntries = Object.entries(categoryMap).map(
    ([category, amount]) => ({ category, amount })
  );

  // If no real data yet, show some sample categories so page isn't empty
  const defaultExpenseSamples = [
    { category: "Food & Dining", amount: 13000 },
    { category: "Cars/Bikes", amount: 70000 },
    { category: "Entertainment", amount: 50000 },
  ];

  const expenseDisplayList =
    categoryEntries.length > 0
      ? categoryEntries
      : defaultExpenseSamples;

  // color palette
  const colorPalette = [
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#facc15",
    "#ec4899",
    "#06b6d4",
    "#f97316",
  ];

  const coloredExpenseList = expenseDisplayList.map((item, idx) => ({
    ...item,
    color: colorPalette[idx % colorPalette.length],
  }));

  // If no incomes yet, show some sample incomes
  const defaultIncomeSamples = [
    { source: "Business", amount: 7000000, date: "Nov 1, 2025" },
    { source: "Crypto", amount: 42350, date: "Nov 3, 2025" },
    { source: "Rentals", amount: 30000, date: "Nov 7, 2025" },
    { source: "Social Media", amount: 120000, date: "Nov 15, 2025" },
  ];

  const incomeDisplayList =
    incomes.length > 0 ? incomes : defaultIncomeSamples;

  // ---------- STYLES ----------

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
  };

  const brandText = {
    fontSize: "22px",
    fontWeight: 700,
    letterSpacing: "0.05em",
  };

  const subtitle = {
    fontSize: "12px",
    opacity: 0.8,
    marginTop: "4px",
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

  const rightHeader = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const badge = {
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.7)",
  };

  const userChip = {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(59,130,246,0.7)",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%)",
  };

  const logoutBtn = {
    background: "rgba(15,23,42,0.75)",
    border: "1px solid rgba(148,163,184,0.6)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "10px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
    backdropFilter: "blur(10px)",
    transition: "0.2s",
  };

  const logoutHover = {
    ...logoutBtn,
    background: "rgba(30,64,175,0.9)",
    boxShadow: "0 0 18px rgba(59,130,246,0.6)",
  };

  const summaryGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "14px",
    marginBottom: "18px",
  };

  const card = {
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(15,23,42,0.9))",
    borderRadius: "20px",
    border: "1px solid rgba(148,163,184,0.4)",
    padding: "18px",
    boxShadow:
      "0 20px 60px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.8)",
    backdropFilter: "blur(16px)",
  };

  const cardTitle = {
    fontSize: "13px",
    opacity: 0.85,
    marginBottom: "4px",
  };

  const cardValue = {
    fontSize: "22px",
    fontWeight: 650,
  };

  const chip = (bg) => ({
    display: "inline-block",
    marginTop: "6px",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "11px",
    background: bg,
  });

  const twoColumnGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "14px",
    marginBottom: "18px",
  };

  const expenseRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    fontSize: "13px",
  };

  const expenseLeft = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const colorDot = (color) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: color,
  });

  const incomeItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(15,23,42,0.9)",
    borderRadius: "12px",
    border: "1px solid rgba(148,163,184,0.3)",
    padding: "9px 11px",
    marginTop: "8px",
    fontSize: "13px",
  };

  const incomeLabel = {
    margin: 0,
    fontSize: "13px",
  };

  const smallMuted = {
    fontSize: "11px",
    opacity: 0.7,
  };

  const incomeAmount = {
    color: "#22c55e",
    fontWeight: 600,
  };

  const budgetCard = {
    ...card,
    marginTop: "6px",
  };

  const inputRow = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginTop: "10px",
    flexWrap: "wrap",
  };

  const inputStyle = {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(148,163,184,0.6)",
    color: "white",
    padding: "8px 10px",
    borderRadius: "10px",
    width: "140px",
    fontSize: "13px",
    outline: "none",
  };

  const btnStyle = {
    background:
      "linear-gradient(135deg, #3b82f6, #6366f1, #22c55e)",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    boxShadow: "0 10px 25px rgba(37,99,235,0.45)",
  };

  const btnGhost = {
    background: "rgba(15,23,42,0.7)",
    color: "rgba(226,232,240,0.9)",
    border: "1px solid rgba(148,163,184,0.6)",
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  };

  const progressLabelRow = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginTop: "14px",
    marginBottom: "6px",
  };

  const progressOuter = {
    height: "10px",
    width: "100%",
    background: "rgba(15,23,42,0.9)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "6px",
    border: "1px solid rgba(30,64,175,0.7)",
  };

  const progressInner = {
    width: `${budgetUsedPct}%`,
    height: "100%",
    background:
      "linear-gradient(90deg,#22c55e,#eab308,#f97316,#ef4444)",
    transition: "width 200ms linear",
  };

  const footerText = {
    fontSize: "11px",
    opacity: 0.7,
    marginTop: "4px",
  };

  const pageFooterHint = {
    fontSize: "10px",
    opacity: 0.6,
    marginTop: "10px",
    textAlign: "right",
  };

  // ---------- RENDER ----------

  const [logoutHoverState, setLogoutHoverState] = useState(false);

  return (
    <div style={page}>
      <div style={shell}>
        {/* App header with username + logout */}
        <div style={header}>
          <div style={brand}>
            <div style={glowIcon}>📊</div>
            <div>
              <div style={brandText}>Smart Expense Tracker</div>
              <div style={subtitle}>
                Overview of your money this month
              </div>
            </div>
          </div>

          <div style={rightHeader}>
            <div style={userChip}>Hi, {username}</div>
            <div style={badge}>{new Date().toLocaleDateString()}</div>
            <button
              style={logoutHoverState ? logoutHover : logoutBtn}
              onMouseEnter={() => setLogoutHoverState(true)}
              onMouseLeave={() => setLogoutHoverState(false)}
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div style={summaryGrid}>
          <div style={card}>
            <div style={cardTitle}>Total Income</div>
            <div style={{ ...cardValue, color: "#22c55e" }}>
              ${totalIncome.toLocaleString()}
            </div>
            <div
              style={chip(
                "radial-gradient(circle at top left, rgba(34,197,94,0.3), transparent 60%)"
              )}
            >
              This month • From saved incomes
            </div>
          </div>

          <div style={card}>
            <div style={cardTitle}>Total Expenses</div>
            <div style={{ ...cardValue, color: "#ef4444" }}>
              ${totalExpenses.toLocaleString()}
            </div>
            <div
              style={chip(
                "radial-gradient(circle at top left, rgba(248,113,113,0.35), transparent 60%)"
              )}
            >
              This month • From saved expenses
            </div>
          </div>

          <div style={card}>
            <div style={cardTitle}>Net Balance</div>
            <div
              style={{
                ...cardValue,
                color: netBalance >= 0 ? "#4ade80" : "#fb7185",
              }}
            >
              {netBalance >= 0 ? "+" : "-"}$
              {Math.abs(netBalance).toLocaleString()}
            </div>
            <div
              style={chip(
                netBalance >= 0
                  ? "radial-gradient(circle at top left, rgba(34,197,94,0.3), transparent 60%)"
                  : "radial-gradient(circle at top left, rgba(248,113,113,0.35), transparent 60%)"
              )}
            >
              {netBalance >= 0
                ? "You’re in surplus this month."
                : "Warning: you’re negative this month."}
            </div>
          </div>
        </div>

        {/* Expenses by category & income sources */}
        <div style={twoColumnGrid}>
          {/* Expenses */}
          <div style={card}>
            <div style={cardTitle}>Expenses by Category</div>
            {coloredExpenseList.map((e, i) => (
              <div key={i} style={expenseRow}>
                <div style={expenseLeft}>
                  <div style={colorDot(e.color)} />
                  <span>{e.category}</span>
                </div>
                <span>${e.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Income */}
          <div style={card}>
            <div style={cardTitle}>Income Sources</div>
            {incomeDisplayList.map((inc, idx) => (
              <div key={idx} style={incomeItem}>
                <div>
                  <p style={incomeLabel}>{inc.source || "Income"}</p>
                  <div style={smallMuted}>
                    {inc.date || "No date saved"}
                  </div>
                </div>
                <strong style={incomeAmount}>
                  +${Number(inc.amount || 0).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
        </div>

        {/* Budget section */}
        <div style={budgetCard}>
          <div style={cardTitle}>Monthly Budget</div>
          <div style={smallMuted}>
            Track your spending against a fixed limit so you know when
            to slow down.
          </div>

          <div style={inputRow}>
            <label
              htmlFor="budget"
              style={{ fontSize: "13px", opacity: 0.9 }}
            >
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
              style={btnGhost}
              onClick={() => {
                setBudget(150000);
                setDraftBudget("150000");
              }}
            >
              Reset
            </button>
          </div>

          <div style={progressLabelRow}>
            <span>Budget Progress</span>
            <span>
              ${totalExpenses.toLocaleString()} / $
              {safeBudget.toLocaleString()}
            </span>
          </div>

          <div style={progressOuter}>
            <div style={progressInner} />
          </div>

          <p style={footerText}>
            {budgetUsedPct.toFixed(1)}% used • $
            {remaining.toLocaleString()} remaining
          </p>
        </div>

        <div style={pageFooterHint}>
          Dashboard uses your saved{" "}
          <code>incomes</code>, <code>expenses</code> and{" "}
          <code>budgetSettings</code> from localStorage.
        </div>
      </div>
    </div>
  );
}
