import React, { useState } from "react";

export default function AddExpense() {
  //Array to store multiple expense entries
  const [expenses, setExpenses] = useState([
    { amount: "", category: "", date: new Date().toISOString().split("T")[0], description: "" },
  ]);

  //Default categories + dynamic addition
  const [categories, setCategories] = useState([
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Other",
  ]);

  //State for custom category input
  const [customCategory, setCustomCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  //Handle input field changes
  const handleChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  //Add new blank expense entry
  const handleAddNew = () => {
    const last = expenses[expenses.length - 1];
    if (!last.amount || !last.category) {
      alert("Please complete the current entry before adding another.");
      return;
    }

    setExpenses([
      ...expenses,
      { amount: "", category: "", date: new Date().toISOString().split("T")[0], description: "" },
    ]);
  };

  //Save all expenses
  const handleSubmit = (e) => {
    e.preventDefault();

    //Check for incomplete entries
    const incomplete = expenses.some((exp) => !exp.amount || !exp.category);
    if (incomplete) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    //Get existing expenses from localStorage
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    //Save all expenses
    localStorage.setItem("expenses", JSON.stringify([...storedExpenses, ...expenses]));

    alert("✅ All expense entries added successfully!");

    //Reset form
    setExpenses([
      { amount: "", category: "", date: new Date().toISOString().split("T")[0], description: "" },
    ]);
  };

  //Add a new custom category
  const handleAddCategory = () => {
    if (!customCategory.trim()) {
      alert("Please enter a category name.");
      return;
    }
    const newCat = customCategory.trim();
    if (!categories.includes(newCat)) {
      setCategories([...categories, newCat]);
    }
    //Assign it to the current expense
    const lastIndex = expenses.length - 1;
    handleChange(lastIndex, "category", newCat);
    setCustomCategory("");
    setIsAddingCategory(false);
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

  const card = {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    overflow: "visible",
  };

  const heading = {
    fontSize: "26px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    alignItems: "center",
  };

  const form = {
    display: "grid",
    gap: "25px",
    marginTop: "20px",
  };

  const label = {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "4px",
    minWidth: "90px",
  };

  const input = {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "10px 12px",
    borderRadius: "10px",
    outline: "none",
    marginLeft: "20px",
    flex: 1,
  };

  const select = {
    ...input,
    backgroundColor: "rgba(40,40,60,1)",
    color: "white",
    marginLeft: "20px",
    flex: 1,
    zIndex: 1000,
    appearance: "none",
  };

  const button = {
    background: "#3b82f6", //blue for expense
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  };

  const addBtn = {
    background: "#10b981", //green add another
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px",
  };

  const formGroup = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "visible",
    zIndex: 2,
    marginBottom: "14px",
  };

  const summaryLine = {
    background: "rgba(255,255,255,0.08)",
    padding: "10px 12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "10px",
  };

  const editBtn = {
    background: "none",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    borderRadius: "6px",
    padding: "3px 8px",
    cursor: "pointer",
    fontSize: "12px",
  };

  //Edit an existing collapsed expense
  const handleEdit = (index) => {
    const updated = [...expenses];
    const current = updated[index];
    updated.splice(index, 1);
    setExpenses([...updated, current]);
  };

  //Component
  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>💳 Add Expense</h2>

        <form onSubmit={handleSubmit} style={form}>
          {/*Show all completed expenses as summary lines*/}
          {expenses.slice(0, expenses.length - 1).map((expense, index) => (
            <div key={index} style={summaryLine}>
              <span>
                💰 ${expense.amount} — {expense.category} ({expense.date})
              </span>
              <button type="button" style={editBtn} onClick={() => handleEdit(index)}>
                Edit
              </button>
            </div>
          ))}

          {/*Show the last (current) editable expense*/}
          {expenses.length > 0 && (
            <div
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "20px",
                marginBottom: "20px",
              }}
            >
              {/*Amount*/}
              <div style={formGroup}>
                <label style={label}>Amount *</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={expenses[expenses.length - 1].amount}
                  onChange={(e) =>
                    handleChange(expenses.length - 1, "amount", e.target.value)
                  }
                  required
                  style={input}
                />
              </div>

              {/*Category*/}
              <div style={formGroup}>
                <label style={label}>Category *</label>
                {!isAddingCategory ? (
                  <select
                    value={expenses[expenses.length - 1].category}
                    onChange={(e) => {
                      if (e.target.value === "add_new") {
                        setIsAddingCategory(true);
                      } else {
                        handleChange(expenses.length - 1, "category", e.target.value);
                      }
                    }}
                    required
                    style={select}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, i) => (
                      <option
                        key={i}
                        value={cat}
                        style={{ backgroundColor: "#1a1a2e", color: "white" }}
                      >
                        {cat}
                      </option>
                    ))}
                    <option value="add_new">➕ Add Custom Category</option>
                  </select>
                ) : (
                  <div style={{ display: "flex", gap: "10px", flex: 1, marginLeft: "20px" }}>
                    <input
                      type="text"
                      placeholder="Enter new category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      style={{ ...input, marginLeft: 0 }}
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      style={{
                        background: "#10b981",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        cursor: "pointer",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/*Date*/}
              <div style={formGroup}>
                <label style={label}>Date</label>
                <input
                  type="date"
                  value={expenses[expenses.length - 1].date}
                  onChange={(e) =>
                    handleChange(expenses.length - 1, "date", e.target.value)
                  }
                  style={input}
                />
              </div>

              {/*Description*/}
              <div style={formGroup}>
                <label style={label}>Description</label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={expenses[expenses.length - 1].description}
                  onChange={(e) =>
                    handleChange(expenses.length - 1, "description", e.target.value)
                  }
                  style={input}
                />
              </div>
            </div>
          )}

          {/*Add another expense*/}
          <button type="button" onClick={handleAddNew} style={addBtn}>
            + Add Another Expense
          </button>

          {/*Save all*/}
          <button type="submit" style={button}>
            Save All Expenses
          </button>
        </form>
      </div>
    </div>
  );
}
