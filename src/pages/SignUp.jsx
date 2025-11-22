// SignUp.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup Successful!");

        // store user ID
        localStorage.setItem("userId", data.userId);

        // redirect to login
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error while signing up");
    }
  };

  return (
    <div className="signup">
      <Header />

      <div className="signup-container">
        <p className="signup-title">Sign Up</p>

        <form className="signup-form" onSubmit={handleSignUp}>
          <label className="signup-label">Name</label>
          <input
            type="text"
            className="signup-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="signup-label">Email</label>
          <input
            type="email"
            className="signup-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="signup-label">Password</label>
          <input
            type="password"
            className="signup-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="signup-btn"
            style={{ display: "block", margin: "20px auto 0 auto" }}
          >
            Sign Up
          </button>
        </form>

        <p className="signup-footer" style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
