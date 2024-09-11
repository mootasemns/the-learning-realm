import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { ReactComponent as SVG } from "./Assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const userIconRef = useRef(null);
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = (theme) => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    toggleMenu();
    window.location.reload();
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleResponsiveMenu = () => {
    setShowResponsiveMenu(!showResponsiveMenu);
  };

  const handleTabClick = (route) => {
    if (route === "/Profile" && isLoggedIn !== "true") {
      navigate("/LoginSignup");
    } else {
      navigate(route);
    }
    setShowResponsiveMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <header>
        <div className="nav-items">
          <nav className={showResponsiveMenu ? "responsive_nav" : ""}>
            <div className="logo" onClick={() => handleTabClick("/")}>
              <SVG />
            </div>
            <span onClick={() => handleTabClick("/")}>Home</span>
            <span onClick={() => handleTabClick("/AI_Services")}>
              AI Services
            </span>
            <span onClick={() => handleTabClick("/LearningHub")}>
              Learning Hub
            </span>
            <span onClick={() => handleTabClick("/CheatDetector")}>
              Our Solutions
            </span>
            <span onClick={() => handleTabClick("/About_Us")}>About Us</span>
            {isLoggedIn === "true" ? (
              <div className="user-icon" onClick={toggleMenu} ref={userIconRef}>
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            ) : (
              <span onClick={() => handleTabClick("/LoginSignup")}>Login</span>
            )}
            {showResponsiveMenu && (
              <div className="close-btn" onClick={toggleResponsiveMenu}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </div>
            )}
            {/* <div className="nav-button">
              <button
                className="btn"
                id="liBtn"
                onClick={() => toggleTheme("light")}
              >
                Light
              </button>
              <button
                className="btn"
                id="DaBtn"
                onClick={() => toggleTheme("dark")}
              >
                Dark
              </button>
            </div> */}
          </nav>
          <div className="menu-btn" onClick={toggleResponsiveMenu}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
        </div>
      </header>
      {showMenu && (
        <div className="user-menu" ref={menuRef}>
          <span
            onClick={() => {
              handleTabClick("/Profile");
              toggleMenu();
            }}
          >
            Profile
          </span>
          <span
            onClick={() => {
              handleTabClick("/Settings");
              toggleMenu();
            }}
          >
            Settings
          </span>
          <span onClick={handleLogout}>Log out</span>
        </div>
      )}
    </>
  );
}

export default Navbar;
