import "./Profile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="profile-layout">
      <Sidebar />

      <div className="profile-content">
        <Navbar />

        <h1 className="profile-title">Profile</h1>

        <div className="profile-card">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>

          <div className="profile-stats">
            <div>
              <h3>--</h3>
              <span>Transactions</span>
            </div>

            <div>
              <h3>--</h3>
              <span>Savings</span>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;