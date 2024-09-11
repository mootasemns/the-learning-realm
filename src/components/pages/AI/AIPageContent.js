import React from "react";
import TextSummarization from "./TextSummarization.js";
import MCQQuizGenerator from "./MCQQuizGenerator.js";
import FlashCardGenerator from "./FlashCardGenerator.js";
import QuestionGenerator from "./QuestionGenerator.js";
import TextToSpeech from "./TextToSpeech.js";
import GrammarCheck from "./GrammarCheck.js";
const AIPageContent = ({ selectedService }) => {
  let content = <div>Select a service from the sidebar</div>;

  switch (selectedService) {
    case "Text Summarization":
      content = <TextSummarization />;
      break;
    case "Question Generator":
      content = <QuestionGenerator />;
      break;
    case "MCQ Quiz Generator":
      content = <MCQQuizGenerator />;
      break;
    case "Flash Cards Generator":
      content = <FlashCardGenerator />;
      break;
    case "Text To Speech Generator":
      content = <TextToSpeech />;
      break;
    case "Grammar Checker":
      content = <GrammarCheck />;
      break;
    default:
      content = <div>No content available for {selectedService}</div>;
  }

  return <>{content}</>;
};

export default AIPageContent;
