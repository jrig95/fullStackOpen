import axios from 'axios'


const getAllWeather = (lat, lon, units, api_key ) => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${api_key}`
  return axios.get(url).then(response => response.data)
}




export default { getAllWeather }
