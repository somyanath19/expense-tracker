import "./Analytics.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";


function Analytics() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    savings: 0,
  });

  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://expense-tracker-ix0o.onrender.com/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.transactions || res.data || [];

      const income = data
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      const expense = data
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      setTransactions(data);

      setSummary({
        income,
        expense,
        balance: income - expense,
        savings: income - expense,
      });
    } catch (error) {
      console.log("Analytics error:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchAnalytics();
    }
  }, [user?._id]);

  const pieData = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      const found = acc.find((x) => x.name === item.category);

      if (found) {
        found.value += Number(item.amount || 0);
      } else {
        acc.push({
          name: item.category,
          value: Number(item.amount || 0),
        });
      }

      return acc;
    }, []);

  const barData = [
    { month: "Jan", income: 25000, expense: 12000 },
    { month: "Feb", income: 28000, expense: 14000 },
    { month: "Mar", income: 30000, expense: 18000 },
    { month: "Apr", income: 32000, expense: 17000 },
    { month: "May", income: 35000, expense: 22000 },
  ];

  const COLORS = ["#8b5cf6", "#3b82f6", "#22c55e", "#f59e0b"];

  return (
    <div className="analytics-layout">
      <Sidebar />

      <div className="analytics-content">
        <Navbar />

        <h1 className="analytics-title">Analytics Overview 📊</h1>

        <div className="analytics-cards">
          <div className="analytics-card">
            <h4>Total Income</h4>
            <h2>₹{summary.income}</h2>
          </div>

          <div className="analytics-card">
            <h4>Total Expense</h4>
            <h2>₹{summary.expense}</h2>
          </div>

          <div className="analytics-card">
            <h4>Savings</h4>
            <h2>₹{summary.savings}</h2>
          </div>

          <div className="analytics-card">
            <h4>Transactions</h4>
            <h2>{transactions.length}</h2>
          </div>
        </div>

        <div className="chart-grid">
          <div className="chart-card">
            <h3>Expense Categories</h3>

            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No expense data available</p>
            )}
          </div>

          <div className="chart-card">
            <h3>Income vs Expense</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#22c55e" />
                <Bar dataKey="expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="insight-card">
          <h3>Financial Insight 💡</h3>
          <p>
            Your expenses are under control. Try maintaining savings above 25%
            of your monthly income.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;