import React, { useState, useEffect } from 'react';
import '../../styles/pages/LearningHub.css';

function LearningHub() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = window.localStorage.getItem('token');

    // Function to fetch questions
    const fetchQuestions = async () => {
        try {
            const response = await fetch('/get_shared_questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            if (data.success) {
                setQuestions(data.questions);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Fetching questions failed, please try again');
        } finally {
            setLoading(false);
        }
    };

    // // Fetch questions when component mounts
    // useEffect(() => {
    //     fetchQuestions();
    // }, []);

    return (
        <div className="learning-hub-container">
            <div className="about-us-header">
                <h1>Learning Hub</h1>
                <p>Explore Shared Generated Resources</p>
            </div>
            <div className="search">
                <input type="text" placeholder="search" />
                <select name="" id="select">
                    <option value="">--Please choose an option--</option>
                    <option value="Summaries">Summaries</option>
                    <option value="FlashCards">Flash Cards</option>
                    <option value="Questions">Questions</option>
                    <option value="MCQ">MCQ</option>
                    <option value="Audios">Audios</option>
                </select>
                <button>Search</button>
            </div>


            <div className="card-container">
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Flash Card</h1>
                <p>pla pla pla</p>
              </div>
            </div>
          </div>
            {/* <div className="card-container">
                {loading && <p>Loading questions...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && questions.length === 0 && <p>No questions found.</p>}
                {!loading && !error && questions.map((question, index) => (
                    <div className="card" key={index}>
                        <div className="card-content">
                            <h1>Question {index + 1}</h1>
                            <p>{question.text}</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default LearningHub;
