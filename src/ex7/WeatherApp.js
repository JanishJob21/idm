import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WeatherApp.css';

const API_KEY = '394161b38b3d0dcc3d25b19b29de09c1'; // Replace with your OpenWeather API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError('');
      
      const url = `${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
      console.log('API Request URL:', url); // Debug log
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data); // Debug log
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      // Check if we have valid data before setting state
      if (!data || !data.main || !data.weather || data.weather.length === 0) {
        throw new Error('Invalid weather data received');
      }
      
      // Get local time using timezone offset (in seconds) from the API
      const localTime = new Date();
      const timezoneOffset = data.timezone || 0; // in seconds
      localTime.setSeconds(localTime.getSeconds() + timezoneOffset + localTime.getTimezoneOffset() * 60);
      
      setWeather({
        city: data.name || 'Unknown',
        country: data.sys?.country || '',
        temperature: Math.round(data.main.temp),
        description: data.weather[0]?.description || '',
        icon: data.weather[0]?.icon || '',
        humidity: data.main?.humidity || 0,
        wind: data.wind?.speed || 0,
        localTime: localTime,
        timezoneOffset: timezoneOffset
      });
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  // Get user's current location weather on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          console.log('Geolocation API URL:', url); // Debug log
          
          fetch(url)
            .then(res => res.json())
            .then(data => {
              console.log('Geolocation API Response:', data); // Debug log
              
              if (!data || !data.main || !data.weather || data.weather.length === 0) {
                throw new Error('Invalid weather data received from geolocation');
              }
              
              // Get local time using timezone offset (in seconds) from the API
              const localTime = new Date();
              const timezoneOffset = data.timezone || 0; // in seconds
              localTime.setSeconds(localTime.getSeconds() + timezoneOffset + localTime.getTimezoneOffset() * 60);
              
              setWeather({
                city: data.name || 'Current Location',
                country: data.sys?.country || '',
                temperature: Math.round(data.main.temp),
                description: data.weather[0]?.description || '',
                icon: data.weather[0]?.icon || '',
                humidity: data.main?.humidity || 0,
                wind: data.wind?.speed || 0,
                localTime: localTime,
                timezoneOffset: timezoneOffset
              });
            })
            .catch(error => {
              console.error('Error fetching weather by location:', error);
              setError('Could not fetch weather for your location. Try searching for a city instead.');
            });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1>Weather Forecast</h1>
        
        <form onSubmit={handleSubmit} className="weather-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="weather-input"
          />
          <button type="submit" className="weather-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <p className="weather-error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <div className="weather-info">
              <h2>{weather.city}, {weather.country}</h2>
              <div className="weather-main">
                <div className="temperature-container">
                  <div className="temperature">
                    {weather.temperature}°C
                  </div>
                  <div className="local-time">
                    {weather.localTime && (
                      <div className="time">
                        {weather.localTime.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    )}
                    {weather.localTime && (
                      <div className="date">
                        {weather.localTime.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="weather-icon">
                  {weather.icon && (
                    <img 
                      src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                      alt={weather.description}
                    />
                  )}
                  <span className="description">{weather.description}</span>
                </div>
              </div>
              <div className="weather-details">
                <div className="detail">
                  <span className="label">Humidity:</span>
                  <span className="value">{weather.humidity}%</span>
                </div>
                <div className="detail">
                  <span className="label">Wind:</span>
                  <span className="value">{weather.wind} m/s</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => navigate('/')} 
          className="back-home-button"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default WeatherApp;
