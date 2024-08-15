import React, { useState } from "react";
import "../../styles/pages/cheatDetector.css"; // Import the CSS file
import roadImage from "../Assets/w404d8mj.jpg"; // Import the image

const CheatDetector = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleTryButtonClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDownloadButtonClick = () => {
    console.log("Hello");
  };

  return (
    <div className="cheat-detector">
      <header>
        <h1>Cheat Detector</h1>
      </header>
      <section className="about">
        <h2 className="cheatdetector-heading">About the Cheat Detector</h2>
        <p>
          Our Cheat Detector is a robust Windows service designed to run
          seamlessly in the background. It leverages advanced classification
          models to monitor user activity and determine if the user is actively
          engaged with our web page or if they have navigated to another page or
          switched to the desktop.
        </p>
      </section>
      <section className="key-features">
        <h2>Key Features</h2>
        <ul>
          <li>
            Real-time Monitoring: Continuously checks user activity to detect
            deviations.
          </li>
          <li>
            High Accuracy: Utilizes sophisticated machine learning algorithms
            for precise detection.
          </li>
          <li>
            Non-Intrusive: Runs silently without disrupting the user experience.
          </li>
          <li>
            Customizable Alerts: Set up notifications for suspicious activity.
          </li>
          <li>
            Comprehensive Reports: Generates detailed logs and reports for
            review.
          </li>
        </ul>
      </section>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>
          The Cheat Detector operates by analyzing user behavior through various
          parameters:
        </p>
        <ul>
          <li>
            <strong>Window Analysis:</strong> Identifies active windows using an
            ML model to ensure they are from our website, not other websites or
            desktop applications.
          </li>
          <li>
            For example, if the user starts a shared quiz then goes to another
            tab, the quiz will be stopped, and the user will be suspected of
            cheating.
          </li>
        </ul>
        <img src={roadImage} alt="Example Image" className="example-image" />
      </section>
      <section className="benefits">
        <h2>Benefits</h2>
        <p>Implementing the cheat detector offers several advantages:</p>
        <ul>
          <li>
            Enhanced Security: Prevents users from cheating by checking if they
            visit another tab or application.
          </li>
          <li>
            Mandatory for Quizzes: Users cannot participate in shared quizzes if
            the Cheat Detector is not installed on their operating system.
          </li>
        </ul>
      </section>
      <div className="buttons">
        <button className="try-button" onClick={handleTryButtonClick}>
          Try our Cheat Detector
        </button>
        <button className="download-button" onClick={handleDownloadButtonClick}>
          Download Cheat Detector App
        </button>
      </div>
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              Cheat Detector has started. Try to visit another window then
              revisit this page.
            </p>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheatDetector;
