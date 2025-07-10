import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

// Mock data for existing discussions
const initialDiscussions = [
  {
    id: 1,
    author: 'Rahul Sharma',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Has anyone worked with React Query before? I need help with caching strategies.',
    timestamp: '2 hours ago',
    likes: 5,
    tags: ['react', 'frontend', 'caching'],
    isResolved: false,
    replies: [
      {
        id: 2,
        author: 'Priya Patel',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        content: 'Yes! I use it in production. What specific caching issue are you facing?',
        timestamp: '1 hour ago',
        likes: 2,
        isBestAnswer: false
      },
      {
        id: 3,
        author: 'Amit Kumar',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        content: 'Check out the docs on query invalidation. It might help with your use case.',
        timestamp: '45 minutes ago',
        likes: 1,
        isBestAnswer: true
      }
    ]
  },
  {
    id: 4,
    author: 'Neha Gupta',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    content: 'Best resources to learn Node.js for beginners?',
    timestamp: '5 hours ago',
    likes: 8,
    tags: ['nodejs', 'backend', 'learning'],
    isResolved: true,
    replies: []
  }
];

const DiscussionItem = ({ discussion, onReply, onLike, onMarkAsBest, onMarkAsResolved }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showAllReplies, setShowAllReplies] = useState(false);
  const replyInputRef = useRef(null);

  const handleReply = () => {
    if (!replyContent.trim()) return;
    onReply(discussion.id, replyContent);
    setReplyContent('');
    setIsReplying(false);
  };

  const bestAnswer = discussion.replies.find(reply => reply.isBestAnswer);
  const otherReplies = discussion.replies.filter(reply => !reply.isBestAnswer);
  const hasReplies = discussion.replies.length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
      <div className="p-5">
        <div className="flex items-start">
          <img 
            className="h-10 w-10 rounded-full object-cover mr-3" 
            src={discussion.avatar} 
            alt={discussion.author} 
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{discussion.author}</h4>
                <p className="text-xs text-gray-500">{discussion.timestamp}</p>
              </div>
              <div className="flex items-center space-x-2">
                {discussion.isResolved && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Icon name="CheckCircle" className="mr-1 h-3 w-3" />
                    Resolved
                  </span>
                )}
                <button 
                  onClick={() => onLike(discussion.id, 'discussion')}
                  className="text-gray-400 hover:text-red-500 flex items-center"
                >
                  <Icon name="ThumbsUp" className="h-4 w-4 mr-1" />
                  <span className="text-xs">{discussion.likes}</span>
                </button>
              </div>
            </div>
            
            <p className="mt-2 text-gray-700">{discussion.content}</p>
            
            {discussion.tags && discussion.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {discussion.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-4 flex items-center space-x-4">
              <button 
                onClick={() => {
                  setIsReplying(!isReplying);
                  if (!isReplying) {
                    setTimeout(() => replyInputRef.current?.focus(), 100);
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Icon name="MessageSquare" className="h-4 w-4 mr-1" />
                {isReplying ? 'Cancel' : 'Reply'}
              </button>
              {!discussion.isResolved && (
                <button 
                  onClick={() => onMarkAsResolved(discussion.id)}
                  className="text-sm text-green-600 hover:text-green-800 flex items-center"
                >
                  <Icon name="Check" className="h-4 w-4 mr-1" />
                  Mark as Resolved
                </button>
              )}
            </div>
            
            {isReplying && (
              <div className="mt-3">
                <textarea
                  ref={replyInputRef}
                  rows="2"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  placeholder="Type your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsReplying(false)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {hasReplies && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium text-gray-900">
              {discussion.replies.length} {discussion.replies.length === 1 ? 'Reply' : 'Replies'}
            </h5>
            {hasReplies && (
              <button 
                onClick={() => setShowAllReplies(!showAllReplies)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showAllReplies ? 'Hide replies' : 'Show all replies'}
              </button>
            )}
          </div>
          
          <AnimatePresence>
            {bestAnswer && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                  <div className="flex items-center mb-2">
                    <div className="flex-shrink-0">
                      <Icon name="Award" className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-800">
                        Best Answer
                      </p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <div className="flex items-start">
                      <img 
                        className="h-8 w-8 rounded-full object-cover mr-2" 
                        src={bestAnswer.avatar} 
                        alt={bestAnswer.author} 
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-medium text-gray-900">{bestAnswer.author}</h6>
                          <span className="text-xs text-gray-500">{bestAnswer.timestamp}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{bestAnswer.content}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                            <Icon name="ThumbsUp" className="h-3 w-3 mr-1" />
                            <span>{bestAnswer.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {showAllReplies && otherReplies.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {otherReplies.map((reply) => (
                  <div key={reply.id} className="flex items-start pl-2 border-l-2 border-gray-200">
                    <img 
                      className="h-8 w-8 rounded-full object-cover mr-3" 
                      src={reply.avatar} 
                      alt={reply.author} 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h6 className="text-sm font-medium text-gray-900">{reply.author}</h6>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                          {!bestAnswer && (
                            <button 
                              onClick={() => onMarkAsBest(discussion.id, reply.id)}
                              className="text-xs text-green-600 hover:text-green-800"
                              title="Mark as best answer"
                            >
                              <Icon name="Award" className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
                      <div className="mt-2 flex items-center">
                        <button 
                          onClick={() => onLike(discussion.id, 'reply', reply.id)}
                          className="text-xs text-gray-500 hover:text-red-500 flex items-center"
                        >
                          <Icon name="ThumbsUp" className="h-3 w-3 mr-1" />
                          <span>{reply.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showAllReplies && otherReplies.length > 0 && (
            <button
              onClick={() => setShowAllReplies(true)}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              + {otherReplies.length} more {otherReplies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const CommunityDiscussion = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedTags, setSelectedTags] = useState(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Get all unique tags from discussions
  const allTags = ['all', ...new Set(discussions.flatMap(d => d.tags || []))];

  // Filter discussions based on selected tags and search query
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       discussion.replies.some(reply => 
                         reply.content.toLowerCase().includes(searchQuery.toLowerCase())
                       );
    
    const matchesTag = selectedTags.includes('all') || 
                     (discussion.tags && discussion.tags.some(tag => selectedTags.includes(tag)));
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unanswered' && discussion.replies.length === 0) ||
                      (activeTab === 'resolved' && discussion.isResolved);
    
    return matchesSearch && matchesTag && matchesTab;
  });

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newDiscussion = {
        id: Date.now(),
        author: 'Current User',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        content: newQuestion,
        timestamp: 'Just now',
        likes: 0,
        tags: ['new'],
        isResolved: false,
        replies: []
      };

      setDiscussions([newDiscussion, ...discussions]);
      setNewQuestion('');
      setIsSubmitting(false);
    }, 500);
  };

  const handleReply = (discussionId, content) => {
    const newReply = {
      id: Date.now(),
      author: 'Current User',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      content,
      timestamp: 'Just now',
      likes: 0,
      isBestAnswer: false
    };

    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          replies: [...discussion.replies, newReply]
        };
      }
      return discussion;
    }));
  };

  const handleLike = (discussionId, type, replyId = null) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        if (type === 'discussion') {
          return {
            ...discussion,
            likes: discussion.likes + 1
          };
        } else if (type === 'reply' && replyId) {
          return {
            ...discussion,
            replies: discussion.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  likes: (reply.likes || 0) + 1
                };
              }
              return reply;
            })
          };
        }
      }
      return discussion;
    }));
  };

  const handleMarkAsBest = (discussionId, replyId) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          replies: discussion.replies.map(reply => ({
            ...reply,
            isBestAnswer: reply.id === replyId
          }))
        };
      }
      return discussion;
    }));
  };

  const handleMarkAsResolved = (discussionId) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          isResolved: true
        };
      }
      return discussion;
    }));
  };

  const toggleTag = (tag) => {
    if (tag === 'all') {
      setSelectedTags(['all']);
    } else {
      setSelectedTags(prev => {
        const newTags = prev.includes('all') ? [] : [...prev];
        if (newTags.includes(tag)) {
          return newTags.filter(t => t !== tag);
        } else {
          return [...newTags, tag];
        }
      });
    }
  };

  return (
    <section id="community-discussion" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          {/* Discussion Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Community Discussion</h2>
            <p className="mt-1 text-sm text-gray-500">
              Ask questions, share knowledge, and help each other grow.
            </p>
          </div>

          {/* New Question Form */}
          <div className="p-6 border-b border-gray-200">
            <form onSubmit={handlePostQuestion} className="space-y-4">
              <div>
                <label htmlFor="question" className="sr-only">Your question</label>
                <div className="mt-1">
                  <textarea
                    id="question"
                    rows={3}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                    placeholder="What would you like to ask the community?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Be specific and include relevant details to get better answers.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newQuestion.trim() || isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Question'}
                </button>
              </div>
            </form>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activeTab === 'all' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('unanswered')}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activeTab === 'unanswered' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Unanswered
                  </button>
                  <button
                    onClick={() => setActiveTab('resolved')}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activeTab === 'resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedTags.includes(tag) 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filteredDiscussions.length > 0 ? (
            <AnimatePresence>
              {filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DiscussionItem 
                    discussion={discussion}
                    onReply={handleReply}
                    onLike={handleLike}
                    onMarkAsBest={handleMarkAsBest}
                    onMarkAsResolved={handleMarkAsResolved}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Icon name="MessageSquare" className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No discussions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedTags.length > 0 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Be the first to start a discussion!'
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityDiscussion;