import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faDownload, faShare } from '@fortawesome/free-solid-svg-icons';

function TextToSpeech() {
  const Token = window.localStorage.getItem("token");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const newMessages = [...messages, { text: inputText, type: "user-text" }];
      setMessages(newMessages);
      setInputText("");

      try {
        const response = await fetch(
          "https://5bf2-109-107-226-136.ngrok-free.app/TextToSpeech/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: inputText }),
          }
        );
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setAudioSrc(url);
          const audioMessage = { url, type: "ai-audio" };
          setMessages((prevMessages) => [...newMessages, audioMessage]);
        } else {
          setMessages((prevMessages) => [
            ...newMessages,
            {
              text: "Sorry, there was an error processing your request.",
              type: "ai-text",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages((prevMessages) => [
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
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearMessages = () => {
    setMessages([]);
    setAudioSrc(null);
  };

  const handleShareAudio = () => {
    if (audioSrc) {
      const link = document.createElement("a");
      link.href = audioSrc;
      link.download = "audio.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

 
  const handleBookmarkAudio = async (text) => {
    if (Token) {
        console.log("Token : ", Token);
        try {
            const response = await fetch("https://gp-server-vxwf.onrender.com/api/saved/audios/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: Token, 
                    audios: [text]
                }),
            });
            const result = await response.json();
            console.log("result : " , result )
            if (response.ok) {
                if (result.success) {
                    alert("Audio bookmarked successfully!");
                } else {
                    alert("Failed to bookmark audio.");
                }
            } else {
                alert("Failed to bookmark audio.");
            }
        } catch (error) {
            console.error("Error bookmarking audio:", error);
            alert("Error bookmarking audio. Please try again.");
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
          Text to Speech
        </div>
        <div className="outbox">
          <div className="chat-box">
            {messages.map((msg, index) =>
              msg.type === "ai-audio" ? (
                <div key={index} className="ai-audio-container">
                  <audio controls ref={audioRef} src={audioSrc}>
                    Your browser does not support the audio element.
                  </audio>
                  <div className="audio-share-icon" onClick={handleShareAudio}>
                    <FontAwesomeIcon icon={faShare} />
                  </div>
                  <div className="audio-bookmark-icon" onClick={handleBookmarkAudio}>
                    <FontAwesomeIcon icon={faBookmark} />
                  </div>
                </div>
              ) : (
                <p key={index} className={msg.type}>
                  {msg.text}
                </p>
              )
            )}
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
          <button onClick={handleClearMessages}>Clear</button>
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
