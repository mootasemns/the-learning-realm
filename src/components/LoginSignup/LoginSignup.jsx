import React, { useState } from "react";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/LoginSignup.css";
import ResendVerification from "../pages/ResendVerification.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // State for Sign Up form
  const initialSignUpFormData = {
    username: "",
    email: "",
    password: "",
  };

  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isResendVerificationOpen, setIsResendVerificationOpen] =
    useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleOpenForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPassword(false);
  };

  const handleOpenResendVerification = () => {
    setIsResendVerificationOpen(true);
  };

  const handleCloseResendVerification = () => {
    setIsResendVerificationOpen(false);
  };

  const handleSignUp = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    let isValid = true;

    if (!signUpFormData.username.trim()) {
      setNameError("Field should contain valid name");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!emailRegex.test(signUpFormData.email)) {
      setEmailError("Field should contain valid Gmail address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // if (!passwordRegex.test(signUpFormData.password)) {
    //   setPasswordError(
    //     "Password should contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
    //   );
    //   isValid = false;
    // } else {
    //   setPasswordError("");
    // }

    // console.log("username: ", signUpFormData.username);
    // console.log("email: ", signUpFormData.email);
    // console.log("password: ", signUpFormData.password);

    if (isValid) {
      try {
        const response = await fetch(
          "https://gp-server-vxwf.onrender.com/api/Users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: signUpFormData.username,
              email: signUpFormData.email,
              password: signUpFormData.password,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          if (data.error === "User Exists") {
            setSignUpMessage(<div className="error-message">{data.error}</div>);
          } else {
            setSignUpMessage(
              <div className="loginsignup-message">Registration Successful</div>
            );
            setAction("Login"); // Switch to login form
          }
        } else {
          setSignUpMessage(
            <div className="error-message">Sign-up failed: {data.error}</div>
          );
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        setSignUpMessage(
          <div className="error-message">
            Error during sign-up: {error.message}
          </div>
        );
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://gp-server-vxwf.onrender.com/api/Users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(loginFormData),
        }
      );

      // Get the response data
      const data = await response.json();
      console.log("Login response:", data);

      // Check for successful response
      if (response.ok) {
        // Check if the data contains a token
        if (data.status === "ok" && data.data) {
          console.log("Logged in successfully as:", loginFormData.email);

          // Store token and login state
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          setLoggedIn(true);

          // Navigate to the home page
          navigate("/");
        } else {
          // Handle unexpected data format
          console.error("Unexpected response format:", data);
          setLoginError("Login failed: Unexpected response format.");
        }
      } else {
        // Handle specific error messages from backend
        if (data.error) {
          console.error("Login failed:", data.error);
          setLoginError("Login failed: " + data.error);
        } else {
          console.error("Login failed: Unknown error.");
          setLoginError("Login failed: Unknown error.");
        }
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      setLoginError("Error during login: " + error.message);
    }
  };

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "signUp") {
      setSignUpFormData({
        ...signUpFormData,
        [name]: value,
      });
    } else {
      setLoginFormData({
        ...loginFormData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className="login-signup-background">
        <div className="loginsignup-container">
          <div className="submit-container-top">
            <div
              className={action === "Login" ? "submit-top gray" : "submit-top"}
              onClick={() => {
                setAction("Sign Up");
              }}
            >
              Sign Up
            </div>
            <div
              className={
                action === "Sign Up" ? "submit-top gray" : "submit-top"
              }
              onClick={() => {
                setAction("Login");
              }}
            >
              Login
            </div>
          </div>
          <div className="loginsignup-header">
            <div className="loginsignup-text">{action}</div>
            <div className="loginsignup-underline"></div>
          </div>
          {action === "Sign Up" ? (
            <div className="loginsignup-inputs">
              <div className="loginsignup-input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={signUpFormData.username}
                  onChange={(e) => handleChange(e, "signUp")}
                />
                {nameError && (
                  <span className="error-message">{nameError}</span>
                )}
              </div>
              <div className="loginsignup-input">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={signUpFormData.email}
                  onChange={(e) => handleChange(e, "signUp")}
                />
                {emailError && (
                  <span className="error-message">{emailError}</span>
                )}
              </div>
              <div className="loginsignup-input">
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signUpFormData.password}
                  onChange={(e) => handleChange(e, "signUp")}
                />
                {passwordError && (
                  <span className="Passworderror-message">{passwordError}</span>
                )}
              </div>
              {signUpMessage}
            </div>
          ) : (
            <div className="loginsignup-inputs">
              <div className="loginsignup-input">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={loginFormData.email}
                  onChange={(e) => handleChange(e, "login")}
                />
              </div>
              <div className="loginsignup-input">
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={(e) => handleChange(e, "login")}
                />
              </div>
              {loginError && (
                <span className="error-message">{loginError}</span>
              )}
              <div className="forgot-password">
                Lost Password?{" "}
                <a onClick={handleOpenForgotPassword}>Click here!</a>
                <p className="forgot-password">
                  Didn't recieve verification link ?{" "}
                  <a onClick={handleOpenResendVerification}>Send again</a>
                </p>
              </div>
            </div>
          )}
          <div className="submit-container-bot">
            <div
              className={action === "Login" ? "submit-bot " : "submit-bot"}
              onClick={action === "Sign Up" ? handleSignUp : handleLogin}
            >
              {action === "Sign Up" ? "Sign Up" : "Login"}
            </div>
          </div>
          {isLoggedIn && <div>You are logged in!</div>}
        </div>
      </div>
      {isResendVerificationOpen && (
        <ResendVerification onClose={handleCloseResendVerification} />
      )}
      <div>
        {isForgotPassword && (
          <ForgotPassword onClose={handleCloseForgotPassword} />
        )}
      </div>
    </>
  );
};

export default LoginSignup;
