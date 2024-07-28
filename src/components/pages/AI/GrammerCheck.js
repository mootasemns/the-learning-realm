import React, { useState } from "react";
// import '../../../styles/pages/TextSummarization.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCopy, faShare } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/pages/Merged.css';

function GrammerCheck() {

    const Token = window.localStorage.getItem("token");
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);

    
    const handleSendMessage = async () => {
        if (inputText.trim() !== "") {
            const newMessages = [...messages, { text: inputText, type: "user-text" }];
            setMessages(newMessages);

            try {
                const response = await fetch("https://5bf2-109-107-226-136.ngrok-free.app/grammer_checker/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: inputText }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data : " , data)
                    const correctedText = { text: data.corrected_text, type: "ai-text" };
                    setMessages([...newMessages, correctedText]);
                } else {
                    setMessages([
                        ...newMessages,
                        { text: "AI: Sorry, there was an error processing your request.", type: "ai-text" },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessages([
                    ...newMessages,
                    { text: "AI: Sorry, there was an error fetching the data.", type: "ai-text" },
                ]);
            }

            setInputText("");
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
        navigator.clipboard.writeText(text)
            .then(() => alert("Text copied to clipboard!"))
            .catch((error) => console.error("Error copying text:", error));
    };
    const handleShareText = (text) => {
        alert("Bookmark functionality is not implemented yet.");

    };


    return (
        <div className="page-container">
            <h2 className="main-text">Try our AI services.</h2>
            <div className="container">
                <div id="ai-service" className="title">Grammer Checker</div>
                <div className="outbox">
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={`text-message-container ${msg.type}`}>
                                <p>{msg.text}</p>
                                {msg.type === "ai-text" && (
                                    <div className="text-message-icons">
                                        <div className="text-copy-icon" onClick={() => handleCopyText(msg.text)}>
                                            <FontAwesomeIcon icon={faCopy} />
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
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={handleClearMessages}>Clear</button>
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            <footer>&copy; 2024 Learning Realm. All rights reserved.</footer>
        </div>
    );
}

export default GrammerCheck;
