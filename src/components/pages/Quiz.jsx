import React, { useState } from "react";
import '../../styles/pages/Quiz.css'

const Quiz = ({ data }) => {

  console.log("data : " ,data )
  console.log("data[0] : " ,data[0] )
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
    // Reset quiz state
    setIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
    setAnsweredQuestions([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setMessage("Quiz URL copied to clipboard");
      setTimeout(() => setMessage(""), 2000);
    });
  };

  const renderFinishPage = () => {
    return (
      <div className="quizpagebody">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{reviewMode ? "Quiz Review" : "Quiz Finished"}</h1>
            <span style={{ cursor: "pointer" }} onClick={copyToClipboard}>
              Share Icon
            </span>
          </div>
          <hr />
          {!reviewMode && (
            <h2>
              Your Score: {score} out of {data.length}
            </h2>
          )}
          {!reviewMode ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={handleReview}>Review</button>
              <button style={{ marginLeft: "20px" }}>Finish</button>
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
        <h1>Quiz App</h1>
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
