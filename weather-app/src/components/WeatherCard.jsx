import React from 'react';
import { motion } from 'framer-motion';
import { formatDate, formatTime, getWeatherIconUrl, capitalizeWords } from '../utils/helpers';

const WeatherCard = ({ weatherData, onRefresh }) => {
  if (!weatherData) return null;

  const {
    name,
    main: { temp, humidity },
    weather,
    wind: { speed },
    sys: { country, sunrise, sunset },
    dt
  } = weatherData;

  return (
    <motion.div
      className="weather-card p-6 md:p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-1">
            {name}, {country}
          </h2>
          <p className="text-sm opacity-75">
            {formatDate(dt)} | {formatTime(dt)}
          </p>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          onClick={onRefresh}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          aria-label="Refresh weather data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <img
            src={getWeatherIconUrl(weather[0].icon)}
            alt={weather[0].description}
            className="w-24 h-24 mr-4"
          />
          <div>
            <h3 className="text-5xl font-bold">{Math.round(temp)}°C</h3>
            <p className="text-xl capitalize">{capitalizeWords(weather[0].description)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-75">Humidity</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Wind Speed</p>
            <p className="text-xl font-semibold">{speed} km/h</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Sunrise</p>
            <p className="text-xl font-semibold">{formatTime(sunrise)}</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Sunset</p>
            <p className="text-xl font-semibold">{formatTime(sunset)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;

