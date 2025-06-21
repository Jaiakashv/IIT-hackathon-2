import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const MobileFilterSheet = ({ 
  isOpen, 
  onClose, 
  categories, 
  activeCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange, 
  sortOptions 
}) => {
  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-200 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl z-300 lg:hidden max-h-[80vh] overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-light">
              <h3 className="text-lg font-semibold text-text-primary">Filters & Sort</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="p-4 space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-text-primary mb-3 flex items-center">
                    <Icon name="Filter" size={18} className="mr-2" />
                    Categories
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeCategory === category
                            ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary hover:bg-primary-50 hover:text-primary'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-medium text-text-primary mb-3 flex items-center">
                    <Icon name="ArrowUpDown" size={18} className="mr-2" />
                    Sort By
                  </h4>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
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

                {/* Apply Button */}
                <div className="pt-4">
                  <button
                    onClick={onClose}
                    className="w-full btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFilterSheet;