import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = search.toLowerCase().trim();

      if (value === "dashboard") {
        navigate("/dashboard");
      } else if (value === "analytics") {
        navigate("/analytics");
      } else if (value === "transactions") {
        navigate("/transactions");
      } else if (value === "profile") {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="navbar">
      <div>
        <h1>Dashboard</h1>
        <p>Track your expenses smartly ✨</p>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search page..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />

        <div className="profile-circle">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;