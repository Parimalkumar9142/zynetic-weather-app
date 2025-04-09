import React from 'react';
import { motion } from 'framer-motion';
import { formatDate, getWeatherIconUrl } from '../utils/helpers';

const ForecastCard = ({ forecast }) => {
  return (
    <motion.div
      className="forecast-card p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-2">{formatDate(forecast.dt)}</h3>
      <div className="flex items-center justify-between">
        <img
          src={getWeatherIconUrl(forecast.weather[0].icon)}
          alt={forecast.weather[0].description}
          className="w-12 h-12"
        />
        <div className="text-right">
          <p className="text-2xl font-bold">{Math.round(forecast.main.temp)}°C</p>
          <p className="text-sm capitalize">{forecast.weather[0].description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ForecastCard;
