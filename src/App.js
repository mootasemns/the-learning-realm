import React from "react";
import Navbar from "./components/Navbar.js";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import AI_Services from "./components/pages/AI_Services";
import LoginSignup from "./components/LoginSignup/LoginSignup.jsx";
import Footer from "./components/pages/Footer.js";
import About_Us from "./components/pages/About_us.js";
import Profile from "./components/pages/Profile.jsx";
import Verification from "./components/pages/Verification.tsx";
import LearningHub from "./components/pages/LearningHub.js";
import CheatDetector from "./components/pages/CheatDetector.js";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/AI_Services" element={<AI_Services />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/About_us" element={<About_Us />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/LearningHub" element={<LearningHub />} />
        <Route path="/CheatDetector" element={<CheatDetector />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
