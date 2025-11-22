// Login.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");

        // save userId returned from server
        localStorage.setItem("userId", data.userId);

        // redirect to save page
        window.location.href = "/save";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error while logging in");
    }
  };

  return (
    <div className="login">
      <Header />

      <div className="login-container">
        <p className="login-title">Log In</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login-btn"
            style={{ display: "block", margin: "20px auto 0 auto" }}
          >
            Login
          </button>
        </form>

        <p className="login-footer" style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/signup" className="login-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
