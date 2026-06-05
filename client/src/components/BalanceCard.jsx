import "./BalanceCard.css";
import { FaWallet } from "react-icons/fa";

function BalanceCard({ title, amount, color }) {
  return (
    <div className={`balance-card ${color}`}>

      <div className="card-icon">
        <FaWallet />
      </div>

      <p>{title}</p>

      <h1>{amount}</h1>

      <span>+2.5% this month</span>

    </div>
  );
}

export default BalanceCard;