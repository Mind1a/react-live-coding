import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // state for Score
  const [score, setScore] = useState(0);

  // state for switch questions

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // state for results

  const [results, setResult] = useState(false);

  //
  const [QuestionData, setQuestionData] = useState({});

  async function getQuizApi() {
    const url = `https://random-colors-lovat.vercel.app/`;
    const response = await axios.get(url);
    setQuestionData(response.data);
  }

  useEffect(() => {
    getQuizApi();
  }, []);

  //function for switch answers/questions

  const handleChangeAnswer = (item) => {
    // compire answer - question
    if (item === QuestionData[currentQuestion]?.color) {
      setScore(score + 1);
    }

    if (currentQuestion < QuestionData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setResult(true);
    }
  };

  // reset quiz
  const handleReset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setResult(false);
  };

  return (
    <div className="main">
      {results ? (
        <div className="result">
          <h1> your score is : {score} , good job</h1>
          <button onClick={handleReset}> Try Again </button>
        </div>
      ) : (
        <div className="quiz">
          <div className="quizTitle">
            <span>
              {currentQuestion + 1} / {QuestionData.length} კითხვა
            </span>
          </div>
          <div className="quizQuestion">
            <div className="questionBox">
              <span
                style={{
                  backgroundColor: `${QuestionData[currentQuestion]?.color}`,
                }}
              >
                {QuestionData[currentQuestion]?.color}
              </span>
            </div>
          </div>
          <div className="quizAnswers">
            <ol>
              {QuestionData[currentQuestion]?.answers.map((item) => {
                return (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          handleChangeAnswer(item);
                        }}
                        style={{ backgroundColor: `${item}` }}
                      >
                        {item}
                      </button>
                    </li>
                  </>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
