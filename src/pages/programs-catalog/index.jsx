// src/pages/programs-catalog/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Breadcrumb from 'components/ui/Breadcrumb';
import AnimatedBackground from 'components/ui/AnimatedBackground';
import FilterSidebar from './components/FilterSidebar';
import MobileFilterSheet from './components/MobileFilterSheet';
import ProgramCard from './components/ProgramCard';

const ProgramsCatalog = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    level: [],
    duration: [],
    price: []
  });
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockPrograms = [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      description: "Learn modern web development with React, Node.js, and MongoDB. Build real-world projects and get job-ready skills.",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Web Development",
      level: "Beginner",
      duration: "12 weeks",
      price: "$1,299",
      rating: 4.8,
      enrollments: 2534,
      instructor: "Sarah Johnson",
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML", "CSS"]
    },
    {
      id: 2,
      title: "Data Science with Python",
      description: "Master data analysis, machine learning, and visualization using Python, pandas, and scikit-learn.",
      image: "https://images.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg",
      category: "Data Science",
      level: "Intermediate",
      duration: "16 weeks",
      price: "$1,599",
      rating: 4.9,
      enrollments: 1876,
      instructor: "Dr. Michael Chen",
      skills: ["Python", "Pandas", "Machine Learning", "Data Visualization", "Statistics"]
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile applications using React Native and JavaScript.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "10 weeks",
      price: "$999",
      rating: 4.7,
      enrollments: 1245,
      instructor: "Alex Rodriguez",
      skills: ["React Native", "JavaScript", "Mobile UI", "API Integration"]
    },
    {
      id: 4,
      title: "Cloud Computing with AWS",
      description: "Learn cloud architecture, deployment, and management using Amazon Web Services.",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Cloud Computing",
      level: "Advanced",
      duration: "8 weeks",
      price: "$1,199",
      rating: 4.6,
      enrollments: 987,
      instructor: "Jennifer Park",
      skills: ["AWS", "Cloud Architecture", "DevOps", "Docker", "Kubernetes"]
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      description: "Master user interface and user experience design principles with hands-on projects.",
      image: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
      category: "Design",
      level: "Beginner",
      duration: "6 weeks",
      price: "$799",
      rating: 4.8,
      enrollments: 3421,
      instructor: "Emma Wilson",
      skills: ["Figma", "Sketch", "Prototyping", "User Research", "Visual Design"]
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      description: "Learn essential cybersecurity concepts, tools, and practices to protect digital assets.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cybersecurity",
      level: "Intermediate",
      duration: "14 weeks",
      price: "$1,399",
      rating: 4.7,
      enrollments: 1654,
      instructor: "Robert Kim",
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Incident Response"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPrograms(mockPrograms);
      setFilteredPrograms(mockPrograms);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           program.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedFilters.category.length === 0 || 
                             selectedFilters.category.includes(program.category);
      
      const matchesLevel = selectedFilters.level.length === 0 || 
                          selectedFilters.level.includes(program.level);
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort filtered programs
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.enrollments - a.enrollments);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price.replace('$', '').replace(',', '')) - parseFloat(a.price.replace('$', '').replace(',', '')));
        break;
      default:
        break;
    }

    setFilteredPrograms(filtered);
  }, [programs, selectedFilters, sortBy, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      level: [],
      duration: [],
      price: []
    });
    setSearchQuery('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatedBackground variant="waves">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl lg:text-4xl font-bold text-text-primary mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Explore Our Programs
              </motion.h1>
              <motion.p 
                className="text-lg text-text-secondary max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Discover industry-leading courses designed to advance your career and build in-demand skills.
              </motion.p>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <motion.input
                  type="text"
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 w-full"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field pr-8 min-w-[150px]"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center space-x-2 bg-surface rounded-lg p-1 border border-border-light">
                  <motion.button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name="Grid3x3" size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name="List" size={16} />
                  </motion.button>
                </div>

                {/* Mobile Filter Button */}
                <motion.button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden btn-primary px-4 py-2 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filters
                </motion.button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedFilters.category.length > 0 || selectedFilters.level.length > 0 || searchQuery) && (
              <motion.div 
                className="mt-4 flex flex-wrap gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 hover:text-primary-700"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                )}
                {selectedFilters.category.map(category => (
                  <span key={category} className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary rounded-full text-sm">
                    {category}
                    <button
                      onClick={() => handleFilterChange('category', category)}
                      className="ml-2 hover:text-secondary-700"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))}
                {selectedFilters.level.map(level => (
                  <span key={level} className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent rounded-full text-sm">
                    {level}
                    <button
                      onClick={() => handleFilterChange('level', level)}
                      className="ml-2 hover:text-accent-700"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))}
                <motion.button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-1 bg-error-100 text-error rounded-full text-sm hover:bg-error-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name="X" size={14} className="mr-1" />
                  Clear all
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                categories={[...new Set(programs.map(program => program.category))]}
                activeCategory={selectedFilters.category[0] || ''}
                onCategoryChange={(category) => handleFilterChange('category', category)}
                sortBy={sortBy}
                onSortChange={setSortBy}
                sortOptions={[
                  { value: 'popularity', label: 'Most Popular' },
                  { value: 'rating', label: 'Highest Rated' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' }
                ]}
              />
            </div>

            {/* Programs Grid/List */}
            <div className="flex-1">
              {/* Results Count */}
              <motion.div 
                className="mb-6 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-text-secondary">
                  {isLoading ? 'Loading...' : `${filteredPrograms.length} programs found`}
                </p>
              </motion.div>

              {/* Programs Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                      <div className="space-y-3">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                        <div className="bg-gray-200 h-3 rounded w-full"></div>
                        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPrograms.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon name="Search" size={64} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">No programs found</h3>
                  <p className="text-text-secondary mb-4">Try adjusting your search or filters</p>
                  <motion.button
                    onClick={clearFilters}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    Clear Filters
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={`grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {filteredPrograms.map((program, index) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <ProgramCard program={program} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet
          isOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          programs={programs}
        />
      </div>
    </AnimatedBackground>
  );
};

export default ProgramsCatalog;