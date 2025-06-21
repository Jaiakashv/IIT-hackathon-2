import React from 'react';
import Quiz from './components/Quiz.jsx';

const Assessments = () => {
  // Sample quiz questions - in a real app, these would come from an API or database
  const sampleQuestions = [
    {
      questionText: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      questionText: 'Which of these is a JavaScript framework?',
      options: ['React', 'Django', 'Laravel', 'Flask'],
      correctAnswer: 'React',
    },
    {
      questionText: 'What is the result of 2 + 2 * 2?',
      options: ['6', '8', '4', '10'],
      correctAnswer: '6',
    },
    {
      questionText: 'Which HTML tag is used to create a hyperlink?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      correctAnswer: '<a>',
    },
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Knowledge Assessment
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Test your understanding with this interactive quiz
          </p>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <Quiz questions={sampleQuestions} />
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                This is a sample assessment. In a real application, questions would be fetched from a database and tailored to the specific course or topic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default Assessments;