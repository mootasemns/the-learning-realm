import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import { ReactComponent as Logo } from "../logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const userIconRef = useRef(null);
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  const handleLogout = () => {
    window.localStorage.clear();
    toggleMenu();
    navigate("/Explore");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleTabClick = (route) => {
    if (route === "/Profile" && isLoggedIn !== "true") {
      navigate("/LoginSignup");
    } else {
      navigate(route);
    }
  };

  // Close menu when clicking outside
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
          <nav>
            <div className="logo" onClick={() => handleTabClick("/")}>
              <Logo />
            </div>
            <span onClick={() => handleTabClick("/")}>Home</span>
            <span onClick={() => handleTabClick("/AI_Services")}>
              AI Services
            </span>
            <span onClick={() => handleTabClick("/LearningHub")}>
              Learning Hub
            </span>
            <span onClick={() => handleTabClick("/")}>Our Solutions</span>
            <span onClick={() => handleTabClick("/About_Us")}>About Us</span>
            {isLoggedIn === "true" ? (
              <>
                <div
                  className="user-icon"
                  onClick={toggleMenu}
                  ref={userIconRef}
                >
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
              </>
            ) : (
              <span onClick={() => handleTabClick("/LoginSignup")}>Login</span>
            )}
          </nav>

          <div className="nav-button">
            <button className="btn" id="liBtn">
              Light
            </button>
            <button className="btn" id="DaBtn">
              Dark
            </button>
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
