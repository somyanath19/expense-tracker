import "./Dashboard.css";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import ExpenseChart from "../components/ExpenseChart";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    savings: 0,
  });

  // ✅ FIXED: stable function (no re-creation issues)
  const fetchSummary = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get(
        "https://expense-tracker-ix0o.onrender.com/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transactions = res.data.transactions || [];

      let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const amt = Number(t.amount) || 0;

      if (t.type === "income") {
        income += amt;
      } else if (t.type === "expense") {
        expense += amt;
      }
    });

      const balance = income - expense;

    setSummary({
      income,
      expense,
      balance,
      savings: balance,
    });

  } catch (error) {
    console.log(
      "SUMMARY ERROR:",
      error.response?.data || error.message
    );
  }
}, []);

  // ✅ only run once
  useEffect(() => {
    if (user?._id) {
      fetchSummary();
    }
  }, [user._id, fetchSummary]);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        {/* WELCOME */}
        <div className="welcome-section">
          <h2>
            {user?.name
              ? `Welcome Back, ${user.name} 👋`
              : "Welcome 👋"}
          </h2>

          <p>Manage your income, expenses and savings.</p>

          <p>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* CARDS */}
        <div className="cards-grid">
          <BalanceCard title="Total Balance" amount={`₹${summary.balance}`} color="purple" />
          <BalanceCard title="Income" amount={`₹${summary.income}`} color="green" />
          <BalanceCard title="Expense" amount={`₹${summary.expense}`} color="red" />
          <BalanceCard title="Savings" amount={`₹${summary.savings}`} color="blue" />
        </div>

        {/* CHART + FORM */}
        <div className="middle-grid">
          <ExpenseChart />
          <TransactionForm onSuccess={fetchSummary} />
        </div>

        {/* BUDGET */}
        <div className="budget-card">
          <h3>Monthly Budget</h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(
                  (summary.expense / 20000) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <p>₹{summary.expense} used of ₹20,000</p>
        </div>

        {/* TIP */}
        <div className="motivation-card">
          <h3>Financial Tip 💡</h3>
          <p>Try saving at least 20% of your monthly income.</p>
        </div>

        {/* TRANSACTIONS */}
        <h2 className="section-title">Recent Transactions</h2>
        <TransactionList onUpdate={fetchSummary} />
      </div>
    </div>
  );
}

export default Dashboard;