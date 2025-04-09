import React from 'react';
import { motion } from 'framer-motion';

const RecentSearches = ({ searches, onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
            onClick={() => onSelect(search)}
          >
            {search}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
