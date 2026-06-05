import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">

      <nav className="landing-navbar">
        <h2 className="logo">💸 ExpenseTracker</h2>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Statistics</a>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Get Started</button>
          </Link>
        </div>
      </nav>

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            🚀 Smart Finance Management
          </span>

          <h1>
            Take Control Of
            <br />
            <span>Your Finances</span>
          </h1>

          <p>
            Track expenses, manage income,
            visualize spending habits and grow
            your savings with powerful analytics.
          </p>

          <Link to="/register">
            <button className="hero-btn">
              Start Tracking Free →
            </button>
          </Link>

        </div>

        <div className="hero-right">

          <div className="floating-card income">
            💰 Income +₹40,000
          </div>

          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200"
            alt="dashboard"
          />

          <div className="floating-card expense">
            📉 Expense -₹15,000
          </div>

        </div>

      </section>

<section className="trusted">

  <p className="trusted-title">
    POWERING BETTER FINANCIAL DECISIONS
  </p>

  <div className="marquee">

    <div className="marquee-content">

      <span>📊 Analytics</span>

      <span>💰 Expense Tracking</span>

      <span>🎯 Budget Goals</span>

      <span>🔒 Secure Access</span>

      <span>📈 Financial Reports</span>

      <span>⚡ Real-Time Insights</span>

      <span>📊 Analytics</span>

      <span>💰 Expense Tracking</span>

      <span>🎯 Budget Goals</span>

      <span>🔒 Secure Access</span>

      <span>📈 Financial Reports</span>

      <span>⚡ Real-Time Insights</span>

    </div>

  </div>

</section>

      <section
        id="features"
        className="features"
      >

        <div className="feature-card">
          <h2>📊 Analytics</h2>

          <p>
            Beautiful charts and reports
            to analyze spending habits.
          </p>
        </div>

        <div className="feature-card">
          <h2>💰 Expense Tracking</h2>

          <p>
            Track every transaction
            with ease.
          </p>
        </div>

        <div className="feature-card">
          <h2>🎯 Budget Goals</h2>

          <p>
            Set monthly goals and
            save more money.
          </p>
        </div>

      </section>


      <section
  id="stats"
  className="stats"
>

  <div className="stat-box">

    <h1>10K+</h1>

    <p>Active Users</p>

  </div>

  <div className="stat-box">

    <h1>50K+</h1>

    <p>Transactions</p>

  </div>

  <div className="stat-box">

    <h1>99%</h1>

    <p>User Satisfaction</p>

  </div>

</section>

      <footer className="footer">

  <h3>💸 ExpenseTracker</h3>

  <p>
    Smart spending starts with
    smart tracking.
  </p>

  <p>
    Manage • Analyze • Save
  </p>

  <p>
    © 2026 ExpenseTracker.
    All Rights Reserved.
  </p>

</footer>

    </div>
  );
}

export default Landing;