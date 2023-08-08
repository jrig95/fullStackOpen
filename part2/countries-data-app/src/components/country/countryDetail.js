import React from 'react'

const CountryDetail = ({country}) => {
  return (
    <div>
          <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Size: {country.area}</p>
          </div>
          <div>
            <h2>Languages</h2>
            {Object.values(country.languages).map(
              (language, index) => (
                <li key={index}>{language}</li>
              )
            )}
            <img src={country.flags.png} alt={country.flags.alt} />
          </div>
        </div>
  )
}

export default CountryDetail
