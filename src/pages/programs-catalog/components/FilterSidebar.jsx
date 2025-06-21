import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ 
  categories = [], 
  activeCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange, 
  sortOptions = [] 
}) => {
  // Ensure categories and sortOptions are always arrays
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeSortOptions = Array.isArray(sortOptions) ? sortOptions : [];
  return (
    <motion.div
      className="bg-surface rounded-lg border border-border-light p-6 sticky top-24"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Categories
        </h3>
        <div className="space-y-2">
          {safeCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:bg-primary-50 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="ArrowUpDown" size={20} className="mr-2" />
          Sort By
        </h3>
        <div className="space-y-2">
          {safeSortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-primary-50 transition-colors"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-secondary">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">Quick Stats</h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-between">
            <span>Total Programs</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Average Duration</span>
            <span className="font-medium">11 weeks</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Success Rate</span>
            <span className="font-medium text-success-600">94%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;