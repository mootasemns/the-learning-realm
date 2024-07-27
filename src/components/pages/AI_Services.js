import React, { useState } from "react";
import "../../styles/pages/AI_Services.css";
import AIPageContent from "./AI/AIPageContent";
function AI_Services() {
  const [selectedService, setSelectedService] = useState("Text Summarization");

  const selectService = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div className="AI_Services">
        <div className="sidebar">
          <a onClick={() => selectService("Text Summarization")}>
            Text Summarization
          </a>
          <a onClick={() => selectService("Question Generator")}>
            Question Generator
          </a>
          <a onClick={() => selectService("MCQ Quiz Generator")}>
            MCQ Quiz Generator
          </a>
          <a onClick={() => selectService("Flash Cards Generator")}>
            Flash Cards Generator
          </a>
          <a onClick={() => selectService("Text To Speech Generator")}>
            Text To Speech Generator
          </a>
          <a onClick={() => selectService("Grammer Checker")}>
            Grammer Checker
          </a>
        </div>
      </div>
      <div className="content">
        <AIPageContent selectedService={selectedService} />
      </div>
    </>
  );
}

export default AI_Services;
