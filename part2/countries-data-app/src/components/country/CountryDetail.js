import React from "react";
import { useState } from "react";
import WeatherData from "../weather/WeatherData";
import { formatNumber } from "../../formatters/currency";
import { Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NoEncryption } from "@mui/icons-material";

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const CountryDetail = ({ country, countries }) => {
  const theme = useTheme();
  const [units, setUnits] = useState("metric");

  const imageStyle = {
    height: "150px",
    width: "250px",
  };

  const textLeft = {
    textAlign:'left'
  }

  const coatOfArmsStyle = {
    height: theme.breakpoints.down("sm") ? "300px" : "250px",
    width: theme.breakpoints.down("sm") ? "100%" : "250px",
    textAlign: "center",
  };

  if (theme.breakpoints.up("md")) {
    imageStyle.height = "250px";
    imageStyle.width = "350px";
    coatOfArmsStyle.height = "250px";
    coatOfArmsStyle.width = "250px";
  }

  const getCountryNameByCode = (code) => {
    const country = countries.find((country) => country.cca3 === code);
    return country ? country.name.common : code;
  };

  const borders = country.borders
    ? country.borders.map(getCountryNameByCode)
    : [];
  let borderString = "";

  if (borders.length === 0) {
    borderString = "No bordering countries";
  } else if (borders.length === 1) {
    borderString = `Bordered by ${borders[0]}`;
  } else {
    const lastBorder = borders.pop();
    borderString = `Bordered by ${borders.join(", ")} and ${lastBorder}`;
  }

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  return (
    <Container maxWidth="xlg" minHeight='100vh'>
      <Box>
        <Typography
          variant="h1"
          sx={{
            textAlign: { xs: "center", sm: "center" },
            marginBottom: { xs: "10px", md: "20px" },
          }}
        >
          {country.name.common}
        </Typography>
        <Box sx={{display: 'flex', justifyContent:'center', flexDirection:{xs:'column', md:'row'}}}>
        <Box sx={{display: 'flex'}}>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:{md:'center'},textAlign:'left', alignItems:'left', paddingRight:{md:'15px'}}}>
        <Typography variant="h3" style={textLeft}>Facts about {country.name.common}</Typography>
        <Typography>
          <strong>Continent:</strong> {country.continents}
        </Typography>
        <Typography>
          <strong>Capital:</strong> {country.capital}
        </Typography>
        <Typography>
          <strong>Size:</strong> {formatNumber(country.area)} km²
        </Typography>
        <Typography>
          <strong>Population:</strong> {formatNumber(country.population)}
        </Typography>
        {Object.entries(country.currencies).map(([code, currency]) => (
          <Typography key={code}>
            <strong>Currency:</strong> {currency.name} - {currency.symbol}
          </Typography>
        ))}
        {country.unMember === true ? (
          <Typography>
            <strong>UN Status:</strong> {country.name.common} is apart of the
            UN.
          </Typography>
        ) : (
          <Typography>
            <strong>UN Status:</strong> {country.name.common} is not apart of
            the UN.
          </Typography>
        )}
        <Typography>
          <strong>Region:</strong> {country.region}
        </Typography>
        <Typography>
          <strong>Subregion:</strong> {country.subregion}
        </Typography>
        <Typography>
          <strong>Latitude:</strong> {country.latlng[0]}°,{" "}
          <strong>Longitude:</strong> {country.latlng[1]}°
        </Typography>
        {country.landlocked === true ? (
          <Box>
            <Typography>
              <strong>{country.name.common}</strong> is a landlocked country.
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography>
              <strong>{country.name.common}</strong> is not a landlocked
              country.
            </Typography>
            <Typography>{borderString}</Typography>
          </Box>
        )}
        <a style={{textDecoration: 'none', color: '#5C76B7', cursor:'pointer'}} href={country.maps.googleMaps} target="_blank" rel="noreferrer">
          View on Google Maps.
        </a>
        <Typography><strong>Languages</strong></Typography>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
        </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            alignItems: { xs: "center", sm: "center", md: "center" },
            justifyContent: { md: "center" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: { md: "30px" },
              paddingBottom: { xs: "10px", sm: "10px" },
              minHeight: { md:'100%', lg: '100%', xlg: '100%' },
            }}
          >
            <Typography
              sx={{ paddingBottom: { xs: "10px", md: "15px" } }}
              variant="h3"
            >
              <strong>Country Flag:</strong>
            </Typography>
            <img
              style={imageStyle}
              src={country.flags.png}
              alt={country.flags.alt}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", minHeight: '100%' }}
          >
            <Typography
              sx={{ paddingBottom: { xs: "10px", md: "15px" } }}
              variant="h3"
            >
              <strong>Coat of Arms:</strong>
            </Typography>
            <img
              style={coatOfArmsStyle}
              src={country.coatOfArms.png}
              alt={`coat of arms for ${country.name.common}`}
            />
          </Box>
        </Box>
        </Box>
      </Box>
      <Box>

        <Box>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", paddingBottom: "10px" }}
          >
            Weather in {country.capital}
          </Typography>
          <Box>
            <WeatherData
              lat={country.latlng[0]}
              lon={country.latlng[1]}
              units={units}
              toggleUnits={toggleUnits}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CountryDetail;
