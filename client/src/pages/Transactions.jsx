import "./Transactions.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Transactions() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTransactions = async () => {
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

    setData(res.data.transactions || []);
  } catch (error) {
    console.log(error);
  }
};

  const deleteTransaction = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://expense-tracker-ix0o.onrender.com/api/transactions/${id}`,
      {
        headers: {
  Authorization: `Bearer ${token}`,
},
      }
    );

    fetchTransactions();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchTransactions();
}, []);

  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      filter === "all" ? true : item.type === filter
    );

  return (
    <div className="tx-layout">
      <Sidebar />

      <div className="tx-content">
        <Navbar />

        <h1 className="tx-title">Transactions</h1>

        <div className="tx-controls">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="tx-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>₹{item.amount}</td>
                    <td className={item.type}>{item.type}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.createdAt?.slice(0, 10)}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTransaction(item._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Transactions;