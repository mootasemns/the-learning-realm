import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/Merged.css';

function FlashCardGenerator() {
  const Token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [flashCardData, setFlashCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleGenerateFlashCards = async () => {
    setMessage(inputText);
    setLoading(true);
    setError(null);

    if (inputText === "") {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("https://c80a-109-107-224-62.ngrok-free.app/generate_flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      console.log("data :", data);

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      setFlashCardData(data);

      // Navigate to Flashcards page with flashCardData as state
      navigate('/flashcards', { state: { flashcards: data } });

    } catch (error) {
      setError(error);
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGenerateFlashCards();
    }
  };

  const handleBookmarkFlashCard = async (text) => {
    if (Token) {
      try {
        const response = await fetch("https://gp-server-vxwf.onrender.com/api/saved/generate_flashcards/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: Token, 
            flashcards: [text]
          }),
        });
        const result = await response.json();
        console.log("result :", result);
        if (response.ok) {
          if (result.success) {
            alert("FlashCard bookmarked successfully!");
          } else {
            alert("Failed to bookmark flashcard.");
          }
        } else {
          alert("Failed to bookmark flashcard.");
        }
      } catch (error) {
        console.error("Error bookmarking flashcard:", error);
        alert("Error bookmarking flashcard. Please try again.");
      }
    } else {
      alert("No token found. Please log in.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="main-text">Try our AI services.</h2>
      <div className="container">
        <div id="ai-service" className="title">Flashcard Generator</div>
        <div className="outbox">
          <div className="chat-box">
            {/* Optionally display generated flashcards before navigation */}
          </div>
          <div className="inputs">
            <textarea
              placeholder="Type text to generate flashcards..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => setInputText("")}>Clear</button>
          <button onClick={handleGenerateFlashCards}>Generate</button>
        </div>
      </div>
      {loading && <p>Generating flashcards...</p>}
      {!loading && message && <p>Flashcards Generated</p>}
      {error && <p>Error generating flashcards: {error.message}</p>}
    </div>
  );
}

export default FlashCardGenerator;
