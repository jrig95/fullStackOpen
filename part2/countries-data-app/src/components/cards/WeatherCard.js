import React from 'react'
import { Card, Typography, Box } from "@mui/material";

const WeatherCard = ({day, units}) => {
  return (
    <Box sx={{ textAlign:'center', paddingRight: { md: '5px' }, paddingBottom: { xs: '5px', md: '0px' }, width: { xs: '100%', sm: 250 }}}>
    <Card variant='outlined' sx={{ maxWidth: '100%',  borderRadius: '5px',
      boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)', minHeight:'200px', padding:'15px' }}>
      <Typography>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' })}</Typography>
      <Typography>{day.weather[0].description}</Typography>
      <img style={{ height: '100px', width: '100px' }} src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
      <Box>
      <Typography><strong>Temperature Low:</strong> {day.temp.min} {units === 'metric' ? '°C' : '°F'}</Typography>
      <Typography><strong>Temperature High:</strong> {day.temp.max} {units === 'metric' ? '°C' : '°F'}</Typography>
      </Box>
    </Card>
  </Box>
  )
}

export default WeatherCard
