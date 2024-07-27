import React from "react";
import '../../styles/pages/About_us.css'
const About_us = () => {
  return (
    <div className="about-us-container">
    <div className="about-us-header">
      <h1>About Us</h1>
      <p>Discover the team behind the innovation</p>
    </div>
    <div className="about-us-content">
      <div className="about-us-section">
        <h2>Our Mission</h2>
        <p>Our mission is to revolutionize education through the power of AI. We aim to make learning more accessible, personalized, and effective for everyone.</p>
      </div>
      <div className="about-us-section">
        <h2>Our Vision</h2>
        <p>We envision a world where education is tailored to the individual needs of each learner, helping them achieve their full potential.</p>
      </div>
      <div className="about-us-section">
        <h2>Our Team</h2>
        <p>Our team consists of experts in AI, education, and software development, all dedicated to creating the best learning experience possible.</p>
      </div>
    </div>
  </div>

  );
};

export default About_us;
