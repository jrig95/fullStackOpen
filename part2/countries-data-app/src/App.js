import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryDetail from "./components/country/countryDetail";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

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
  };

  // const filterCountries = searchFilter ? countries.filter((country) => country.name.common.toLowerCase().includes(searchFilter.toLowerCase)) : countries
  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      find countries:{" "}
      <input onChange={handleCountryChange} placeholder="enter a country" />
      {filterCountries.length > 10 ? (
        <p>please narrow down your search</p>
      ) : filterCountries.length > 1 && filterCountries.length <= 10 ? (
        filterCountries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))
      ) : filterCountries.length === 1 ? (
        <CountryDetail country={filterCountries[0]} />
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default App;
