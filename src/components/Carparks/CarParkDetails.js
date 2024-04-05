import React from "react";
import { Typography, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { useState, useEffect } from "react";

/**
 * A component for displaying information about a car park.
 * @component
 * @returns {JSX.Element} CarParkDisplay component.
 */
function CarParkDetails(carPark) {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originLat, setOriginLat] = useState(null);
  const [originLng, setOriginLng] = useState(null);
  carPark = carPark.carPark;

  const generateTripDetails = async (carPark) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: originLat, lng: originLng };
    const destination = { lat: carPark.lat, lng: carPark.lng };

    try {
      const results = await directionsService.route({
        origin: origin,
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      if (results) {
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      } else {
        alert("Error in calculating route");
      }
    } catch (error) {
      console.error("Error in generating trip details:", error);
      alert("Error in calculating route");
    }
  };
  useEffect(() => {
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
    }
  }, [carPark, originLat, originLng]); // Fetch user's current location only once when component mounts

  useEffect(() => {
    if (originLat !== null && originLng !== null) {
      generateTripDetails(carPark);
    }
  }, [carPark, generateTripDetails]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {carPark.name}
        </Typography>
      </Grid>
      <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Grid item>
          <LocationOnIcon sx={{ color: red[500], fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize={16}>
            <strong>Address:</strong> {carPark.address}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <CompareArrowsIcon sx={{ fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize={16}>
            <strong>Estimated Distance:</strong> {distance}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <AccessTimeIcon sx={{ fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize={16}>
            <strong>Estimated Duration:</strong> {duration}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <DriveEtaIcon sx={{ fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize={16}>
            <strong>Mode:</strong> Driving
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CarParkDetails;
