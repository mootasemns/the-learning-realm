import React, { useState } from "react";
import '../../styles/pages/Quiz.css';

const Quiz = ({ data }) => {
  const Token = window.localStorage.getItem("token");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [finished, setFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [message, setMessage] = useState("");

  const nextQuestion = () => {
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        ...data[index],
        selectedAnswer,
      },
    ]);
    setSelectedAnswer(null);

    if (index + 1 < data.length) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleAnswerSelection = (choice) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(choice);
      if (data[index].correct_answer.includes(choice)) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleFinishReview = () => {
    setReviewMode(false);
  };

  const handleFinish = () => {
    window.location.reload();
  };


  const handleBookmarkMCQ = async () => {
    if (Token) {
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
              quizzes: [data],
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

  const renderFinishPage = () => {
    return (
      <div className="quizpagebody">
        <div className="container">
          <div className="header">
            <h1>{reviewMode ? "Quiz Review" : "Quiz Finished"}</h1>
            <span className="share-icon" onClick={handleBookmarkMCQ}>
              Share
            </span>
          </div>
          <hr />
          {!reviewMode && (
            <h2>
              Your Score: {score} out of {data.length}
            </h2>
          )}
          {!reviewMode ? (
            <div style={{ textAlign: "center", marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <button onClick={handleReview} style={{ marginRight: "20px" }}>Review</button>
              <button onClick={handleFinish}>Finish</button>
            </div>
          ) : (
            <div className="finished-questions">
              {answeredQuestions.map((question, idx) => (
                <div key={idx} className="question-container">
                  <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    {idx + 1}. {question.question}
                  </p>
                  <ul>
                    {question.distractors.map((choice, choiceIdx) => (
                      <li
                        key={choiceIdx}
                        className={
                          choice === question.correct_answer[0]
                            ? "correct"
                            : choice === question.selectedAnswer
                            ? "incorrect"
                            : ""
                        }
                      >
                        {choice}
                      </li>
                    ))}
                  </ul>
                  <hr style={{ margin: "20px 0" }} />
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={handleFinishReview}>Finish Review</button>
              </div>
            </div>
          )}
        </div>
        {message && <div className="message">{message}</div>}
      </div>
    );
  };

  const currentQuestion = data[index];

  if (finished) {
    return renderFinishPage();
  }

  return (
    <div className="quizpagebody">
      <div className="container">
        <div className="header">
          <h1>Quiz App</h1>
          <span className="share-text" onClick={handleBookmarkMCQ}>
            Share
          </span>
        </div>
        <hr />
        <h2>
          {index + 1}. {currentQuestion.question}
        </h2>
        <ul>
          {currentQuestion.distractors.map((choice, idx) => (
            <li
              key={idx}
              onClick={() => handleAnswerSelection(choice)}
              className={
                selectedAnswer === null
                  ? ""
                  : currentQuestion.correct_answer.includes(choice)
                  ? "correct"
                  : choice === selectedAnswer
                  ? "incorrect"
                  : ""
              }
            >
              {choice}
            </li>
          ))}
        </ul>
        {selectedAnswer !== null && (
          <p>
            {currentQuestion.correct_answer.includes(selectedAnswer)
              ? "Correct! Advance to the next question."
              : "Incorrect! Advance to the next question."}
          </p>
        )}
        <button
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
          className={selectedAnswer === null ? "disabled" : ""}
        >
          {index + 1 === data.length ? "Finish" : "Next"}
        </button>
        <div className="index">
          {index + 1} of {data.length} questions
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Quiz;
