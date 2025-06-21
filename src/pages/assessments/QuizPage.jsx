import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodePlayground from './components/CodePlayground';

// Sample questions for each quiz category
const quizQuestions = {
  html: [
    {
      questionText: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Hyperlinks and Text Markup Language',
        'Home Tool Markup Language'
      ],
      correctAnswer: 'Hyper Text Markup Language',
    },
    {
      questionText: 'Which HTML tag is used to create a hyperlink?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      correctAnswer: '<a>',
    },
    {
      questionText: 'What is the correct HTML element for the largest heading?',
      options: ['<h6>', '<heading>', '<h1>', '<head>'],
      correctAnswer: '<h1>',
    },
  ],
  css: [
    {
      questionText: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Creative Style System',
        'Cascading Style Sheets',
        'Colorful Style Sheets'
      ],
      correctAnswer: 'Cascading Style Sheets',
    },
    {
      questionText: 'Which property is used to change the background color?',
      options: ['bgcolor', 'color-background', 'background-color', 'bg-color'],
      correctAnswer: 'background-color',
    },
  ],
  // Add more categories as needed
};

const categoryTitles = {
  html: 'HTML Quiz',
  css: 'CSS Quiz',
  javascript: 'JavaScript Quiz',
  react: 'React Quiz',
  python: 'Python Quiz',
  java: 'Java Quiz'
};

const QuizPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch questions from an API
    setQuestions(quizQuestions[category] || []);
  }, [category]);

  const handleAnswerSelect = (selectedOption) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(selectedOption);
    const correct = questions[currentQuestionIndex].correctAnswer === selectedOption;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz not found</h2>
          <button 
            onClick={() => navigate('/assessments')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Completed!</h2>
          <div className="mb-8">
            <div className="text-5xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
            <div className="text-gray-600">Your Score</div>
            <div className="mt-4 text-gray-700">
              {score === questions.length ? '🎉 Perfect! You got all answers right!' : 
               score > questions.length / 2 ? '👍 Good job! Keep practicing!' : 
               '💪 Keep learning! You can do better next time!'}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleRestart}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Restart Quiz
            </button>
            <button
              onClick={() => navigate('/assessments')}
              className="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{categoryTitles[category] || 'Quiz'}</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.questionText}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'w-full text-left p-4 rounded-lg border transition-colors ';
                
                if (selectedAnswer !== null) {
                  if (option === currentQuestion.correctAnswer) {
                    buttonClass += 'bg-green-100 border-green-400 text-green-800';
                  } else if (option === selectedAnswer && !isAnswerCorrect) {
                    buttonClass += 'bg-red-100 border-red-400 text-red-800';
                  } else {
                    buttonClass += 'border-gray-200 text-gray-700';
                  }
                } else {
                  buttonClass += 'border-gray-200 hover:border-blue-400 text-gray-700';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={buttonClass}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            
            {selectedAnswer !== null && (
              <div className={`mt-6 p-4 rounded-lg ${isAnswerCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {isAnswerCorrect ? (
                  <p className="font-medium">✅ Correct! Well done!</p>
                ) : (
                  <>
                    <p className="font-medium">❌ Incorrect</p>
                    <p className="mt-1 text-sm">The correct answer is: <span className="font-semibold">{currentQuestion.correctAnswer}</span></p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/assessments')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to All Quizzes
          </button>
        </div>
      </div>
      
      {/* Code Playground Section */}
      <div className="mt-16 p-6 bg-white rounded-lg shadow-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Code Playground</h2>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-4">
          <CodePlayground />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;