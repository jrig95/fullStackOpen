import { useState, useEffect } from 'react'
import weatherService from '../../services/weather'
import axios from 'axios'

const WeatherData = ({lat, lon, units, toggleUnits}) => {
  const api_key = process.env.REACT_APP_OPEN_WEATHER_APP_API_KEY
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchWeatherData = () => {
      setLoading(true)
    weatherService
    .getAllWeather(lat, lon, units, api_key)
    .then(returnWeather=> {
      console.log(returnWeather)
      setWeatherData(returnWeather)
      setLoading(false);
    })
    .catch(error => {
      console.error('an error occurred while fetching', error)
      setLoading(false);
    })
  }

  fetchWeatherData();

  // fetch data every 10 minutes
  const intervalId = setInterval(fetchWeatherData, 10 * 60 * 1000)

  return () => clearInterval(intervalId)
  }, [lat, lon, units, api_key])


  return (
    <div>
              {loading ? (
                <p>Loading weather data...</p>
              ) : (
                <div>
                <div>
                <p>Todays Date: {new Date(weatherData.current.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit'  })}</p>
                <p>Current Temperature: {weatherData.current.temp} {units === 'metric' ? '°C' : '°F'}</p>
                <p>Feels Like: {weatherData.current.feels_like} {units === 'metric' ? '°C' : '°F'}</p>
                <img src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`} alt={weatherData.current.weather[0].description} />
                <p>{weatherData.current.weather[0].description}</p>
                </div>
                <div>
                <h2> 7 day forecast</h2>
                {weatherData.daily.slice(0,7).map((day, index)=> (
                  <div key={index}>
                    <p>Date: {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit'  })}</p>
                    <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={weatherData.current.weather[0].description} />
                     <p>Temperature Low: {day.temp.min} {units === 'metric' ? '°C' : '°F'}</p>
                     <p>Temperature High: {day.temp.max} {units === 'metric' ? '°C' : '°F'}</p>
                    <p>{day.weather[0].description}</p>
                  </div>
              ))}
                </div>
                </div>
              )}
              <button onClick={toggleUnits}>Change units</button>
            </div>
  )
}

export default WeatherData
