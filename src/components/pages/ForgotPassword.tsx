import React, { useState, useEffect } from "react";
import '../../styles/pages/ForgotPassword.scss'


export default function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://gp-server-vxwf.onrender.com/api/Users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
        const data = response.json();
        
      if (response.ok) {

        alert("Password reset link sent successfully.");
        // onClose(); // Close the pop-up
      } else {
       
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleClose = () => {
    onClose(); // Close the pop-up
  };

  return (
    <div className="re-popup">
      <form onSubmit={handleSubmit}>
        <h3>Forgot Password</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Click here!
          </button>
        </div>

        {/* Add a close button */}
        <div className="d-grid mt-3">
          <a  className="close-text" onClick={handleClose}>
            Close
          </a>
        </div>
      </form>
    </div>
  );
}
