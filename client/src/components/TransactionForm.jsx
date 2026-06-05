import "./TransactionForm.css";
import { useState } from "react";
import axios from "axios";

function TransactionForm({ onSuccess }) {

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "Food",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user._id) {
        alert("Login expired. Please login again.");
        return;
      }

      if (!formData.title || !formData.amount || !formData.type || !formData.category) {
        alert("Please fill all fields");
        return;
      }

      const payload = {
        title: formData.title.trim(),
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        userId: user._id,
      };

      console.log("🔥 FINAL PAYLOAD:", payload);

      const token = localStorage.getItem("token");

const res = await axios.post(
  "http://localhost:5000/api/transactions",
  payload,
  {
    headers: {
  Authorization: `Bearer ${token}`,
},
  }
);

      console.log("✅ SUCCESS:", res.data);

      alert("Transaction Added ✅");

      if (onSuccess) onSuccess();

      setFormData({
        title: "",
        amount: "",
        type: "income",
        category: "Food",
      });

    } catch (error) {
      console.log("❌ FULL ERROR:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "Failed to add transaction ❌"
      );
    }
  };

  return (
    <div className="form-card">

      <h2>Add Transaction</h2>

      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="amount"
        placeholder="Enter Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Education">Education</option>
      </select>

      <button onClick={handleSubmit}>
        Add Transaction
      </button>

    </div>
  );
}

export default TransactionForm;