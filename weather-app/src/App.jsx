import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import RecentSearches from './components/RecentSearches';
import ForecastCard from './components/ForecastCard';
import { useTheme } from './context/ThemeContext';
import useWeather from './hooks/useWeather';
import "../src/index.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const { 
    weatherData, 
    forecastData, 
    loading, 
    error, 
    fetchWeather, 
    fetchForecast 
  } = useWeather();

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = async (searchCity) => {
    setCity(searchCity);
    await fetchWeather(searchCity);
    await fetchForecast(searchCity);
    
    // Add to recent searches
    if (searchCity.trim() !== '') {
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== searchCity.toLowerCase());
        return [searchCity, ...filtered].slice(0, 5);
      });
    }
  };

  const handleRecentSearch = (searchCity) => {
    handleSearch(searchCity);
  };

  const handleRefresh = () => {
    if (city) {
      handleSearch(city);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${theme}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />
        
        {recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches} 
            onSelect={handleRecentSearch} 
          />
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : weatherData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherCard 
              weatherData={weatherData} 
              onRefresh={handleRefresh} 
            />
            
            {forecastData && forecastData.list && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {forecastData.list
                    .filter((item, index) => index % 8 === 0) 
                    .map((forecast, index) => (
                      <ForecastCard key={index} forecast={forecast} />
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Enter a city name to get the weather forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
