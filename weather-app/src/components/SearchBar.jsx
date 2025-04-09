import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="search-bar flex items-center p-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className={`flex-grow p-2 outline-none bg-transparent ${
            theme === 'dark' ? 'text-white placeholder-gray-300' : 'text-gray-800 placeholder-gray-500'
          }`}
          aria-label="City name"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Search
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
