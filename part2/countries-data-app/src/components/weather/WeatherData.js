import { useState, useEffect } from 'react'
import weatherService from '../../services/weather'
import WeatherCard from '../cards/WeatherCard';
import {Button, Typography, Container, Box, Card, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const WeatherData = ({lat, lon, units, toggleUnits}) => {
  const api_key = process.env.REACT_APP_OPEN_WEATHER_APP_API_KEY
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDay, setStartDay] = useState(0)

  const theme = useTheme();
  const isSmOrXsScreen = useMediaQuery(theme.breakpoints.down('md'));

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


  const handleNext = () => {
    if (startDay < weatherData.daily.length - 4) {
    setStartDay(startDay + 1);
  }
  }
   const handlePrev = () => {
    if (startDay > 0){
    setStartDay(startDay - 1)
    }
  }
  return (
    <Container maxWidth='lg'>
              {loading ? (
                <Typography variant='h2'>Loading weather data...</Typography>
              ) : (
                <Box>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                <Box sx={{paddingBottom: '30px',md:{display: 'flex', justifyContent: 'center'}, lg:{display: 'flex', justifyContent: 'center'},width: { xs: '100%', sm: 250 }, textAlign:'center'}}>
                <Card variant='outlined' sx={{ maxWidth: '100%',  borderRadius: '5px',
      boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)', minHeight:'200px', padding:'15px' }}>
                <Typography><strong>Todays Date:</strong> {new Date(weatherData.current.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit'  })}</Typography>
                <Typography>{weatherData.current.weather[0].description}</Typography>
                <img style={{ height: '100px', width: '100px' }} src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`} alt={weatherData.current.weather[0].description} />
                 <Typography>Current Temperature: {weatherData.current.temp} {units === 'metric' ? '°C' : '°F'}</Typography>
                <Typography>Feels Like: {weatherData.current.feels_like} {units === 'metric' ? '°C' : '°F'}</Typography>
                </Card>
                </Box>
                </Box>


                <Box sx={{display: 'flex', marginBottom:{lg:'20px'}, flexDirection: { xs:'column', sm: 'column', md: 'column' }}}>
                <Typography variant='h2' sx={{textAlign:'center', paddingBottom: { xs: '5px', sm:'5px', md: '15px' }}}> 7 day forecast</Typography>
                <Box sx={{textAlign:'center', paddingBottom: { xs: '2px', sm:'5px', md: '15px' }}}>
                <Button sx={{backgroundColor: theme.palette.otherColors.steelBlue}}variant="contained" onClick={toggleUnits}>Change units</Button>
                </Box>
                <Box sx={{display: 'flex', alignItems:{sm:'center'}, width: '100%', justifyContent:'center', lg:{marginBottom:'20px'},xlg:{marginBottom:'20px'}, flexDirection: { xs: 'column', sm: 'column',md: 'row' }}}>
                <Button onClick={handlePrev}>
            {isSmOrXsScreen ? (
              <KeyboardArrowUpIcon sx={{ color: theme.palette.otherColors.steelBlue }} />
            ) : (
              <ChevronLeftIcon sx={{ color: theme.palette.otherColors.steelBlue }} />
            )}
          </Button>
                {weatherData.daily.slice(startDay, startDay + 4).map((day, index)=> (
                <WeatherCard day={day} key={index} units={units}/>
              ))}
              <Button onClick={handleNext}>
            {isSmOrXsScreen ? (
              <KeyboardArrowDownIcon sx={{ color: theme.palette.otherColors.steelBlue }} />
            ) : (
              <ChevronRightIcon sx={{ color: theme.palette.otherColors.steelBlue }} />
            )}
          </Button>
              </Box>
                </Box>
                </Box>
              )}

            </Container>
  )
}

export default WeatherData
