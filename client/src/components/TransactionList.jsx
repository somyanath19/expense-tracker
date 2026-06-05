import "./TransactionList.css";
import { useEffect, useState } from "react";
import axios from "axios";

function TransactionList() {

  const [transactions, setTransactions] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {

    const fetchTransactions =
      async () => {

        try {

          const res =
            await axios.get(
              `http://localhost:5000/api/transactions/${user.id}`
            );

          setTransactions(res.data);

        } catch (error) {

          console.log(error);

        }
      };

    if(user.id){
      fetchTransactions();
    }

  }, [user.id]);

  return (
    <div className="transaction-card">
      
      <div className="transaction-header">
        <h2>
          Recent Transactions ({transactions.length})
        </h2>
      </div>

      {transactions.map((item) => (

        <div
          className="transaction-item"
          key={item._id}
        >

          <div>
            <h4>{item.title}</h4>
            <p>{item.category}</p>
          </div>

          <h3
            className={
              item.type === "income"
                ? "green"
                : "red"
            }
          >
            {item.type === "income"
              ? "+ "
              : "- "}
            ₹{item.amount}
          </h3>

        </div>

      ))}

    </div>
  );
}

export default TransactionList;