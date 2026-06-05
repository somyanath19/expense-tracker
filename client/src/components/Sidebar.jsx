import "./Sidebar.css";

import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaChartPie,
  FaWallet,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};
  return (
    <div className="sidebar">

      <h2>💸 Expense</h2>

      <ul>

        <li
  className={location.pathname === "/dashboard" ? "active" : ""}
  onClick={() => navigate("/dashboard")}
>
  <FaHome />
  Dashboard
</li>

<li
  className={location.pathname === "/analytics" ? "active" : ""}
  onClick={() => navigate("/analytics")}
>
  <FaChartPie />
  Analytics
</li>

<li
  className={location.pathname === "/transactions" ? "active" : ""}
  onClick={() => navigate("/transactions")}
>
  <FaWallet />
  Transactions
</li>

<li
  className={location.pathname === "/profile" ? "active" : ""}
  onClick={() => navigate("/profile")}
>
  <FaUser />
  Profile
</li>

<li onClick={handleLogout}>
  <FaSignOutAlt />
  Logout
</li>

      </ul>

    </div>
  );
}

export default Sidebar;