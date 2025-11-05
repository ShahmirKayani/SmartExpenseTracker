import React, { useState } from "react";

export default function AddIncome() {
  //Array to store multiple income entries
  const [incomes, setIncomes] = useState([
    { amount: "", source: "", date: new Date().toISOString().split("T")[0], description: "" },
  ]);

  //Handle input field changes
  const handleChange = (index, field, value) => {
    const updated = [...incomes];
    updated[index][field] = value;
    setIncomes(updated);
  };

  //Add new blank income entry
  const handleAddNew = () => {
    const last = incomes[incomes.length - 1];
    if (!last.amount || !last.source) {
      alert("Please complete the current entry before adding another.");
      return;
    }

    setIncomes([
      ...incomes,
      { amount: "", source: "", date: new Date().toISOString().split("T")[0], description: "" },
    ]);
  };

  //Save all incomes
  const handleSubmit = (e) => {
    e.preventDefault();

    //Check for incomplete entries
    const incomplete = incomes.some((inc) => !inc.amount || !inc.source);
    if (incomplete) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    //Get existing incomes from localStorage
    const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];

    //Save all incomes
    localStorage.setItem("incomes", JSON.stringify([...storedIncomes, ...incomes]));

    alert("✅ All income entries added successfully!");

    //Reset form
    setIncomes([
      { amount: "", source: "", date: new Date().toISOString().split("T")[0], description: "" },
    ]);
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

  const button = {
    background: "#10b981", //green for income
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
    background: "#2563eb", //blue add another
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

  //Edit an existing collapsed income
  const handleEdit = (index) => {
    const updated = [...incomes];
    const current = updated[index];
    //Move the selected one to the end to edit again
    updated.splice(index, 1);
    setIncomes([...updated, current]);
  };

  //Component
  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>💵 Add Income</h2>

        <form onSubmit={handleSubmit} style={form}>
          {/*Show all completed incomes as summary lines*/}
          {incomes.slice(0, incomes.length - 1).map((income, index) => (
            <div key={index} style={summaryLine}>
              <span>
                💰 ${income.amount} — {income.source} ({income.date})
              </span>
              <button type="button" style={editBtn} onClick={() => handleEdit(index)}>
                Edit
              </button>
            </div>
          ))}

          {/*Show the last (current) editable income*/}
          {incomes.length > 0 && (
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
                  value={incomes[incomes.length - 1].amount}
                  onChange={(e) =>
                    handleChange(incomes.length - 1, "amount", e.target.value)
                  }
                  required
                  style={input}
                />
              </div>

              {/*Source*/}
              <div style={formGroup}>
                <label style={label}>Source *</label>
                <input
                  type="text"
                  placeholder="e.g., Salary, Freelance, Investment"
                  value={incomes[incomes.length - 1].source}
                  onChange={(e) =>
                    handleChange(incomes.length - 1, "source", e.target.value)
                  }
                  required
                  style={input}
                />
              </div>

              {/*Date*/}
              <div style={formGroup}>
                <label style={label}>Date</label>
                <input
                  type="date"
                  value={incomes[incomes.length - 1].date}
                  onChange={(e) =>
                    handleChange(incomes.length - 1, "date", e.target.value)
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
                  value={incomes[incomes.length - 1].description}
                  onChange={(e) =>
                    handleChange(incomes.length - 1, "description", e.target.value)
                  }
                  style={input}
                />
              </div>
            </div>
          )}

          {/*Add another source*/}
          <button type="button" onClick={handleAddNew} style={addBtn}>
            + Add Another Source
          </button>

          {/*Save all*/}
          <button type="submit" style={button}>
            Save All Incomes
          </button>
        </form>
      </div>
    </div>
  );
}
