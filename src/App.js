import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import SetBudget from "./pages/SetBudget";

//Component for hiding navbar on AuthPage
function Layout() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div>
      {showNavbar && (
        <nav
          style={{
            backgroundColor: "#0a0a23",
            padding: "12px",
            display: "flex",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <Link style={{ color: "white", textDecoration: "none" }} to="/dashboard">
            Dashboard
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to="/add-income">
            Add Income
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to="/add-expense">
            Add Expense
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to="/set-budget">
            Set Budget
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/set-budget" element={<SetBudget />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
