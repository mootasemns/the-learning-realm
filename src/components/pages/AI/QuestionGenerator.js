import React, { useState } from "react";
import '../../../styles/pages/QuestionGenerator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';

function QuestionsGenerator() {
    const Token = window.localStorage.getItem("token");

    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        if (inputText.trim() !== "") {
            const newMessages = [...messages, { text: inputText, type: "user-text" }];
            setMessages(newMessages);

            try {
                const response = await fetch("https://9659-91-186-247-233.ngrok-free.app/generate_questions/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: inputText }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data : " , data)
                    const questions = Object.values(data).map(item => item.question); // Extract questions from the response

                    const summaryMessages = questions.map((question, index) => ({
                        text: question,
                        type: "ai-text"
                    }));

                    setMessages([...newMessages, ...summaryMessages]);
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

    const handleShareText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Text copied to clipboard!"))
            .catch((error) => console.error("Error copying text:", error));
    };

    const handleBookmarkText = (text) => {
        // Implement your bookmark logic here
        alert("Bookmark functionality is not implemented yet.");
    };

    return (
        <div className="page-container">
            <h2 className="main-text">Try our AI services.</h2>
            <div className="container">
                <div id="ai-service" className="title">Question Generator</div>
                <div className="outbox">
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={`text-message-container ${msg.type}`}>
                                <p>{msg.text}</p>
                                {msg.type === "ai-text" && (
                                    <div className="text-message-icons">
                                        <div className="text-share-icon" onClick={() => handleShareText(msg.text)}>
                                            <FontAwesomeIcon icon={faShare} />
                                        </div>
                                        <div className="text-bookmark-icon" onClick={() => handleBookmarkText(msg.text)}>
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

export default QuestionsGenerator;
