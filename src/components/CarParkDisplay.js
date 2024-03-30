import React from "react";
import { Paper, Typography, Grid, IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import MoneyIcon from "@mui/icons-material/Money";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { green, blue, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { useState, useEffect } from "react";
import { NavigationRounded } from "@mui/icons-material";

/**
 * A component for displaying information about a car park.
 * @component
 * @returns {JSX.Element} CarParkDisplay component.
 */
function CarParkDisplay({
  carPark,
  onGenerateDirectionsLink,
  onRemove,
  onRename,
}) {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originLat, setOriginLat] = useState(null);
  const [originLng, setOriginLng] = useState(null);

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
  }, []); // Fetch user's current location only once when component mounts

  useEffect(() => {
    if (originLat !== null && originLng !== null) {
      generateTripDetails(carPark.lat, carPark.lng);
    }
  }, [carPark, originLat, originLng]); // Trigger trip details calculation when carPark or user's location changes

  const generateTripDetails = async (lat, lng) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: originLat, lng: originLng };
    const destination = { lat: lat, lng: lng };
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

  return (
    <Paper elevation={5} sx={{ p: 2, mb: 2, width: "100%" }}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {carPark.cpID}
          </Typography>
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
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body1" fontSize={16}>
                <strong>Weekday:</strong> ${carPark.weekdayRate} /{" "}
                {carPark.weekdayMin}
              </Typography>
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body1" fontSize={16}>
                <strong>Sat:</strong> ${carPark.satdayRate} /{" "}
                {carPark.satdayMin}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body1" fontSize={16}>
                <strong>Sun/PH:</strong> ${carPark.sunPHRate} /{" "}
                {carPark.sunPHMin}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <AccessTimeIcon sx={{ color: blue[500], fontSize: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body2" fontSize={16}>
                <strong>Start Time:</strong> {carPark.startTime}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <AccessTimeIcon sx={{ color: blue[500], fontSize: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body2" fontSize={16}>
                <strong>End Time:</strong> {carPark.endTime}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <IconButton
            onClick={() => onGenerateDirectionsLink(carPark.lat, carPark.lng)}
          >
            <DirectionsIcon sx={{ color: blue[500], fontSize: 32 }} />
          </IconButton>

          <IconButton onClick={() => onRename(carPark)} sx={{ color: "blue" }}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => onRemove(carPark)} sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CarParkDisplay;
