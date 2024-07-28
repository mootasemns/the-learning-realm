import React, { useState } from "react";
// import '../../../styles/pages/QuestionGenerator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/pages/Merged.css';

function QuestionsGenerator() {
    const Token = window.localStorage.getItem("token");

    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [fullQuestions, setFullQuestions] = useState([]); // State to store full question-answer pairs

    const handleSendMessage = async () => {
        if (inputText.trim() !== "") {
            const newMessages = [...messages, { text: inputText, type: "user-text" }];
            setMessages(newMessages);

            try {
                const response = await fetch("https://5bf2-109-107-226-136.ngrok-free.app/generate_questions/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: inputText }),
                });
                const data = await response.json();
                console.log("data : ", data)

                if (response.ok) {
                    const questions = Object.values(data).map(item => ({
                        question: item.question,
                        answer: item.answer
                    }));

                    const questionMessages = questions.map((item, index) => ({
                        text: item.question,
                        type: "ai-text",
                        id: index
                    }));

                    setMessages([...newMessages, ...questionMessages]);
                    setFullQuestions([...fullQuestions, ...questions]); // Store full question-answer pairs
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
        setFullQuestions([]); // Clear full question-answer pairs
    };

    const handleShareText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Text copied to clipboard!"))
            .catch((error) => console.error("Error copying text:", error));
    };
        
    const handleBookmarkQuestions = async (index) => {
        if (Token) {
            console.log("Token : ", Token);
            try {
                const response = await fetch(
                    "https://gp-server-vxwf.onrender.com/api/saved/questions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: Token,
                            questions: [fullQuestions[index]],
                        }),
                    }
                );
                
                const result = await response.json();
                console.log("result : ", result);
                if (response.ok) {
                    if (result.success) {
                        alert("Question bookmarked successfully!");
                    } else {
                        alert("Failed to bookmark question.");
                    }
                } else {
                    alert("Failed to bookmark question.");
                }
            } catch (error) {
                console.error("Error bookmarking question:", error);
                alert("Error bookmarking question. Please try again.");
            }
        } else {
            alert("No token found. Please log in.");
        }
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
                                        <div className="text-bookmark-icon" onClick={() => handleBookmarkQuestions(msg.id)}>
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
