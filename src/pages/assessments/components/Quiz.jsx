import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (questionIndex, selectedOption) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [questionIndex]: selectedOption
    };
    setSelectedAnswers(newSelectedAnswers);

    if (selectedOption === questions[questionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = questionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-6">
            You scored {score} out of {questions.length}
          </p>
          <div className="space-x-4">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/programs-catalog')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1}/{questions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${((currentQuestion) / questions.length) * 100}%`
                }}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {questions[currentQuestion].questionText}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion, option)}
                  className={`w-full text-left p-3 rounded border ${
                    selectedAnswers[currentQuestion] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  } transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;