import React, { useState } from "react";
import '../../../styles/pages/MCQGenerator.css';
import Quiz from "../Quiz.jsx";


function MCQQuizGenerator() {
  const Token = window.localStorage.getItem("token");

  const [inputText, setInputText] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
      setMessage(inputText);
      setLoading(true);
      setError(null);

      if (inputText === "") {
        alert("Please enter some text to generate a quiz.");
        return;
      }
      try {
        const response = await fetch(
          "https://9659-91-186-247-233.ngrok-free.app/generate_mcq",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ context: "Data", method: "Wordnet" }),
          }
        );
        const data = await response.json();
        setQuizData(data);
  
        if (!response.ok) {
          throw new Error("Failed to generate quiz");
        }
        
      } catch (error) {
        setError(error);
    
        console.error("Error generating quiz:", error);
      } finally {
        setLoading(false);
      }
    };
if (loading) {
  return <p>Loading..</p>;
}
if (error) {
  return <p>Error</p>;
}
if (quizData) {
  return <Quiz data={quizData} />;
}

  const handleKeyDown = (event) => {
      if (event.key === "Enter") {
          handleSendMessage();
      }
  };


  const handleBookmarkMCQ = async (text) => {
    if (Token) {
      console.log("Token : ", Token);
      try {
        const response = await fetch(
          "https://gp-server-vxwf.onrender.com/api/saved/quizzes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: Token,
              quizzes: [text],
            }),
          }
        );
        const result = await response.json();
        console.log("result : ", result);
        if (response.ok) {
          if (result.success) {
            alert("MCQ bookmarked successfully!");
          } else {
            alert("Failed to bookmark quiz.");
          }
        } else {
          alert("Failed to bookmark quiz.");
        }
      } catch (error) {
        console.error("Error bookmarking quiz:", error);
        alert("Error bookmarking quiz. Please try again.");
      }
    } else {
      alert("No token found. Please log in.");
    }
  };

  return (
      <div className="page-container">
          <h2 className="main-text">Try our AI services.</h2>
          <div className="container">
              <div id="ai-service" className="title">MCQ Quiz Generator</div>
              <div className="outbox">
                  <div className="chat-box">
                  </div>
                  <div className="inputs">
                      <textarea
                          placeholder="Type a message..."
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={handleKeyDown}
                      />
                  </div>
              </div>
              <div className="buttons">
                  <button>Clear</button>
                  <button onClick={handleSendMessage}>Send</button>
              </div>
          </div>
          {loading && <p>GeneratingQuiz</p>}
          {!loading && message && <p>Quiz Generated</p>}
          <div className="quiz" id="quiz-container"></div>
      </div>
  );
}

export default MCQQuizGenerator;
