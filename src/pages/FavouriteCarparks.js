import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Grid, TextField, IconButton, Paper } from "@mui/material";
import CarParkDisplay from "../components/CarParkDisplay";
import {
  readFavouriteCarparks,
  removeFavouriteCarpark,
  renameFavouriteCarpark,
} from "../backend/command";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header";

/**
 * A component for displaying favourite carparks UI.
 * @component
 * @returns {JSX.Element} Favourite Carparks UI.
 */
export default function FavouriteCarparks() {
  const defaultTheme = createTheme();
  const [carParks, setCarParks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [originLat, setOriginLat] = useState(null);
  const [originLng, setOriginLng] = useState(null);

  useEffect(() => {
    fetchFavouriteCarparks();
    fetchGeoLocation();
  }, []);

  const fetchFavouriteCarparks = async () => {
    try {
      const favouriteCarparks = await readFavouriteCarparks();
      setCarParks(favouriteCarparks);
    } catch (error) {
      console.error("Error fetching favourite carparks:", error);
    }
  };

  const fetchGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOriginLat(latitude);
          setOriginLng(longitude);
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
        }
      );
    } else {
      console.error(`Your browser doesn't support Geolocation`);
    }
  };

  const handleRemoveFavouriteCarpark = async (carpark) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this car park?"
    );
    if (confirmed) {
      removeFavouriteCarpark(carParks, carpark);
      fetchFavouriteCarparks();
    }
  };

  const handleRenameFavouriteCarpark = (carpark) => {
    const newCarparkName = prompt(
      "Enter the new name for the carpark:",
      carpark.name
    );
    if (newCarparkName !== null) {
      renameFavouriteCarpark(carParks, carpark, newCarparkName);
      fetchFavouriteCarparks();
    }
  };

  const generateDirectionsLink = (destLat, destLng) => {
    if (originLat && originLng) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
      window.open(url, "_blank");
    } else {
      console.error("Geolocation data not available yet.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <Container
        component="main"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "grey",
        }}
        maxWidth="xxl"
      >
        <Box
          sx={{
            backgroundColor: "white",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            borderRadius: "20px",
            opacity: "0.9",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <FavoriteIcon fontSize="medium" />
          </Avatar>
          <Typography sx={{ mb: 2 }} component="h1" variant="h5">
            Favourite Carparks
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton size="large">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Grid container spacing={2}>
            {carParks
              ?.filter((carPark) =>
                carPark.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((carPark, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    sx={{
                      padding: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <CarParkDisplay
                        carPark={carPark}
                        onGenerateDirectionsLink={(lat, lng) =>
                          generateDirectionsLink(lat, lng)
                        }
                        onRemove={() => handleRemoveFavouriteCarpark(carPark)}
                        onRename={() => handleRenameFavouriteCarpark(carPark)}
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
