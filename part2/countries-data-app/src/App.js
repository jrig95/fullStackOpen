import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryDetail from "./components/country/CountryDetail";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import axios from "axios";



const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null)

  const theme = useTheme()

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
    <Container maxWidth="xlg" sx={{display: 'flex',justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '100vh'}}>
    <Box>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center'}}>
    <Box sx={{display: 'flex', alignItems:'center'}}>
      <Typography> find countries:{" "} </Typography>
      <TextField onChange={handleCountryChange} placeholder="enter a country" />
    </Box>
    <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} countries={countries}/>
      ) :
        filterCountries.length > 10 ? (
        <Typography sx={{paddingTop:{xs:'10px',md:'10px'}}}>Please narrow down your search</Typography>
      ) : filterCountries.length > 1 && filterCountries.length <= 10 ? (
        filterCountries.map((country) => (
          <Box key={country.cca3} sx={{display:'flex', alignItems:'center', justifyContent:'left'}}>
          <Box sx={{alignItems: 'left', textAlign: 'left', paddingBottom:'10px'}}>
          <Typography sx={{fontSize:{xs:'20px',md: '25px'}}}>{country.name.common}{" "}</Typography>
            <Button sx={{backgroundColor: theme.palette.otherColors.steelBlue, fontSize:'8px'}}variant="contained"onClick={() => handleCountryClick(country)}>
              Link to Country
            </Button>
            </Box>
          </Box>
        ))
      ) : filterCountries.length === 1 ? (
        <CountryDetail country={filterCountries[0]} countries={countries}/>
      ) : (
        <Typography>No matches found</Typography>
      )}
      </Box>
      </Box>

        </Box>
    </Container>
  );
};

export default App;
