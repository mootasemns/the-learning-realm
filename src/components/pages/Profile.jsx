import React, { useState, useEffect } from "react";
import "../../styles/pages/Profile.css";

const user = {
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWwNyMppD7qiGkc28RpXtMipOE622_1RWaQ&s",
};

const Profile = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const Token = window.localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [audios, setAudios] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [activeTab, setActiveTab] = useState("Summaries");
  const [deleteItem, setDeleteItem] = useState(null); // For handling which item to delete
  const [showConfirm, setShowConfirm] = useState(false); // For showing confirmation modal

  const getUserData = async () => {
    try {
      const response = await fetch(
        "https://gp-server-vxwf.onrender.com/api/saved/userData",
        {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: Token,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.data === "token expired") {
          window.localStorage.clear();
        } else {
          console.log("data : ", data.data);
          setUsername(data.data.username || "");
          // Reset state before setting new data
          setQuizzes(data.data.quizzes || []);
          setSummaries(data.data.summaries || []);
          setQuestions(data.data.questions || []);
          setAudios(data.data.audios || []);
          setFlashcards(data.data.flashcards || []);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = (id) => {
    // Function to handle the deletion
    setSummaries((prevSummaries) =>
      prevSummaries.filter((summary) => summary._id !== id)
    );
    setShowConfirm(false);
  };

  const handleOpenConfirm = (itemId) => {
    setDeleteItem(itemId);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "Summaries":
        return (
          <div>
            <h1>Summaries</h1>
            <div className="grid-container">
              {summaries.map((summary, index) => (
                <div className="grid-item" key={summary._id || index}>
                  <button
                    className="delete-button"
                    onClick={() => handleOpenConfirm(summary._id)}
                  >
                    delete
                  </button>
                  <p>{summary.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Flashcards":
        return (
          <div>
            <h1>Flashcards</h1>
            <div className="grid-container">
              {flashcards.map((flashcard, index) => (
                <div className="grid-item" key={flashcard._id || index}>
                  <p>{flashcard.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Questions":
        return (
          <div>
            <h1>Questions</h1>
            <div className="grid-container">
              {questions.map((question, index) => (
                <div className="grid-item" key={question._id || index}>
                  <p>{question.question}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Audios":
        return (
          <div>
            <h1>Audios</h1>
            <div className="grid-container">
              {audios.map((audio, index) => (
                <div className="grid-item" key={audio._id || index}>
                  <audio controls>
                    <source src={audio.url} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
            </div>
          </div>
        );
      case "Quizzes":
        return (
          <div>
            <h1>Quizzes</h1>
            <div className="grid-container">
              {quizzes.map((quiz, index) => (
                <div className="grid-item" key={quiz._id || index}>
                  <p>{quiz.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <img className="user-icon" src={user.profilePicture} alt="User" />
          <p className="username">{username}</p>
        </div>

        <h1>Saved Creations</h1>
          <div className="saves">
            <button onClick={() => setActiveTab("Summaries")}>Summaries</button>
            <button onClick={() => setActiveTab("Flashcards")}>
              Flash Cards
            </button>
            <button onClick={() => setActiveTab("Questions")}>Questions</button>
            <button onClick={() => setActiveTab("Audios")}>Voice Texts</button>
            <button onClick={() => setActiveTab("Quizzes")}>Quizzes</button>
          </div>

        <div className="content-container">
       
          <hr />
          {renderContent()}
        </div>

        {showConfirm && (
          <div className="confirm-dialog">
            <p className="confirm-message">
              Are you sure you want to delete this summary?
            </p>
            <div className="confirm-buttons">
              <button
                className="confirm-button"
                onClick={() => handleDelete(deleteItem)}
              >
                Confirm
              </button>
              <button className="close-button" onClick={handleCloseConfirm}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="profile-footer">
        <footer />
      </div>
    </div>
  );
};

export default Profile;
