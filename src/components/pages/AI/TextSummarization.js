import React, { useState } from "react";
import "../../../styles/pages/Merged.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCopy, faShare } from "@fortawesome/free-solid-svg-icons";

function TextSummarization() {
  const Token = window.localStorage.getItem("token");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const newMessages = [...messages, { text: inputText, type: "user-text" }];
      setMessages(newMessages);

      try {
        setInputText("");
        const response = await fetch(
          "https://5bf2-109-107-226-136.ngrok-free.app/summarize/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: inputText }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const summaryMessage = { text: data.summary, type: "ai-text" };
          setMessages([...newMessages, summaryMessage]);
        } else {
          setMessages([
            ...newMessages,
            {
              text: "Sorry, there was an error processing your request.",
              type: "ai-text",
            },
          ]);
        }
      } catch (error) {
        setInputText("");
        console.error("Error fetching data:", error);
        setMessages([
          ...newMessages,
          {
            text: "Sorry, there was an error fetching the data.",
            type: "ai-text",
          },
        ]);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  const handleCopyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Text copied to clipboard!"))
      .catch((error) => console.error("Error copying text:", error));
  };

  const handleShareText = (text) => {
    alert("Bookmark functionality is not implemented yet.");
  };

  const handleBookmarkText = async (text) => {
    if (Token) {
      console.log("Token : ", Token);
      try {
        const response = await fetch(
          "https://gp-server-vxwf.onrender.com/api/saved/summaries/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: Token,
              summaries: [text],
            }),
          }
        );
        const result = await response.json();
        console.log("result : ", result);
        if (response.ok) {
          if (result.success) {
            alert("Text bookmarked successfully!");
          } else {
            alert("Failed to bookmark text.");
          }
        } else {
          alert("Failed to bookmark text.");
        }
      } catch (error) {
        console.error("Error bookmarking text:", error);
        alert("Error bookmarking text. Please try again.");
      }
    } else {
      alert("No token found. Please log in.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="main-text">Try our AI services.</h2>
      <div className="container">
        <div id="ai-service" className="title">
          Text Summarization
        </div>
        <div className="outbox">
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`text-message-container ${msg.type}`}>
                <p>{msg.text}</p>
                {msg.type === "ai-text" && (
                  <div className="text-message-icons">
                    <div
                      className="text-copy-icon"
                      onClick={() => handleCopyText(msg.text)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </div>
                    <div
                      className="text-share-icon"
                      onClick={() => handleShareText(msg.text)}
                    >
                      <FontAwesomeIcon icon={faShare} />
                    </div>
                    <div
                      className="text-bookmark-icon"
                      onClick={() => handleBookmarkText(msg.text)}
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="inputs">
            <textarea
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                height: inputText
                  ? `${Math.min(inputText.split("\n").length * 1.6, 15)}rem`
                  : "auto",
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleClearMessages}>Clear</button>
          <button onClick={handleSendMessage}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default TextSummarization;
