import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log("✅ LOGIN SUCCESS:", res.data);

      // save token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        localStorage.setItem(
          "userId",
          res.data.user._id
        );
      }

      alert("Login Successful 🎉");

      navigate("/dashboard");

    } catch (error) {
      console.log("❌ LOGIN ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <h1>💸 ExpenseTracker</h1>
        <h2>Welcome Back</h2>
        <p>
          Log in to continue tracking your expenses.
        </p>
      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                👁️
              </span>

            </div>

            <button type="submit">
              Login
            </button>

          </form>

          <p className="register-text">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;