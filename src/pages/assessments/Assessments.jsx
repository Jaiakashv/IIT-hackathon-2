import React from 'react';
import { useNavigate } from 'react-router-dom';

const quizCategories = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Test your knowledge of HTML5, semantic elements, and web structure.',
    icon: '💻',
    questionCount: 10,
    difficulty: 'Beginner'
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Challenge yourself with CSS3, Flexbox, Grid, and responsive design.',
    icon: '🎨',
    questionCount: 12,
    difficulty: 'Beginner'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master JavaScript fundamentals, ES6+, and modern JS features.',
    icon: '📜',
    questionCount: 15,
    difficulty: 'Intermediate'
  },
  {
    id: 'react',
    title: 'React',
    description: 'Test your React.js knowledge including hooks and component lifecycle.',
    icon: '⚛️',
    questionCount: 12,
    difficulty: 'Intermediate'
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Python programming basics, data structures, and algorithms.',
    icon: '🐍',
    questionCount: 15,
    difficulty: 'Beginner'
  },
  {
    id: 'java',
    title: 'Java',
    description: 'Java programming concepts, OOP, and core Java features.',
    icon: '☕',
    questionCount: 12,
    difficulty: 'Intermediate'
  }
];

const QuizCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={() => navigate(`/assessments/quiz/${category.id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{category.icon}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(category.difficulty)}`}>
            {category.difficulty}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>📊 {category.questionCount} questions</span>
          <span className="text-blue-600 font-medium">Start Quiz →</span>
        </div>
      </div>
    </div>
  );
};

const Assessments = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6 mt-7">
            Knowledge Assessments
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test and improve your skills with our interactive quizzes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((category) => (
            <QuizCategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Can't find what you're looking for?</h3>
          <p className="text-blue-700">More quizzes are coming soon! Check back later for updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Assessments;