import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryDetail from "./components/country/CountryDetail";



const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.error("there is an error", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setSearchFilter(event.target.value);
    setSelectedCountry(null);
  };


  const handleCountryClick = (country) => {
    setSelectedCountry(country)
  }

  // const filterCountries = searchFilter ? countries.filter((country) => country.name.common.toLowerCase().includes(searchFilter.toLowerCase)) : countries
  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      find countries:{" "}
      <input onChange={handleCountryChange} placeholder="enter a country" />
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} countries={countries}/>
      ) :
        filterCountries.length > 10 ? (
        <p>please narrow down your search</p>
      ) : filterCountries.length > 1 && filterCountries.length <= 10 ? (
        filterCountries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => handleCountryClick(country)}>
              Link to individual item
            </button>
          </div>
        ))
      ) : filterCountries.length === 1 ? (
        <CountryDetail country={filterCountries[0]} countries={countries}/>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default App;
