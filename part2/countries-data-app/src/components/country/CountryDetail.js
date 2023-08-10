import React from 'react'
import {useState } from 'react'
import WeatherData from '../weather/WeatherData'

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const CountryDetail = ({country, countries}) => {
  const [units, setUnits] = useState('metric')

  const getCountryNameByCode = (code) => {
    const country = countries.find(country => country.cca3 === code);
    return country ? country.name.common : code;
  }

  const borders = country.borders.map(getCountryNameByCode);
  let borderString = ''

  if (borders.length === 0) {
    borderString = 'No bordering countries'
  } else if (borders.length === 1) {
    borderString = `Bordered by ${borders[0]}`
  } else {
    const lastBorder = borders.pop();
    borderString = `Bordered by ${borders.join(', ')} and ${lastBorder}`
  }

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric')
  }


  return (
    <div>
          <div>
            <h1>{country.name.common}</h1>
            <p>Continent: {country.continents}</p>
            <p>Capital: {country.capital}</p>
            <p>Size: {country.area}</p>
            <p>Population: {country.population}</p>
            <p>Timezone: {country.timezones}</p>
            {Object.entries(country.currencies).map(([code, currency]) => (
              <p key={code}>Currency: {currency.name} - {currency.symbol}</p>
            ))}
            {country.unMember === true ? (
              <p>UN Status: {country.name.common} is apart of the UN.</p>
            ) : (
              <p>UN Status: {country.name.common} is not apart of the UN.</p>
            )
            }
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Latitude: {country.latlng[0]}°, Longitude: {country.latlng[1]}°</p>
            {country.landlocked === true ? (
              <div>
              <p>{country.name.common} is a landlocked country.</p>
              </div>
            ) : (
              <div>
              <p>{country.name.common} is not a landlocked country.</p>
              <p>{borderString}</p>
              </div>
            )}
            <a href={country.maps.googleMaps} target="_blank" rel="noreferrer">View on Google Maps.</a>

          </div>
          <div>
            <h2>Languages</h2>
            {Object.values(country.languages).map(
              (language, index) => (
                <li key={index}>{language}</li>
              )
            )}
            <img src={country.flags.png} alt={country.flags.alt} />
            <img src={country.coatOfArms.png} alt={`coat of arms for ${country.name.common}`} />
            <div>
            <h2>Weather in {country.capital}</h2>
            <WeatherData lat={country.latlng[0]} lon={country.latlng[1]} units={units} toggleUnits={toggleUnits}/>
            </div>
          </div>
        </div>
  )
}

export default CountryDetail
