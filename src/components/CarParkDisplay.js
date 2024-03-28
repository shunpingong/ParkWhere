import React from "react";
import { Paper, Typography, Grid, IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";

/**
 * A component for displaying information about a car park.
 * @component
 * @returns {JSX.Element} CarParkDisplay component.
 */
function CarParkDisplay({ carPark }) {
  /**
   * Handles searching directions for the car park using Google Maps.
   * @function
   */
  const searchDirection = () => {
    // Link to Gmap.js
    console.log("Searching directions for", carPark.ppName);
  };
  return (
    <Paper elevation={5}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h5">{carPark.ppName}</Typography>
          <Typography>
            Weekday: {carPark.weekdayRate}/{carPark.weekdayMin}
          </Typography>
          <Typography>
            Sat: {carPark.satdayRate}/{carPark.satdayMin}
          </Typography>
          <Typography>
            Sun/PH: {carPark.sunPHRate}/{carPark.sunPHMin}
          </Typography>
          <Typography>Start Time: {carPark.startTime}</Typography>
          <Typography>End Time: {carPark.endTime}</Typography>
          {/* <Typography>Parking System: {carPark.parkingSystem}</Typography>
          <Typography>Park Capacity: {carPark.parkCapacity}</Typography> */}
        </Grid>
        <Grid
          item
          xs={4}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton onClick={searchDirection}>
            <DirectionsIcon color="grey" fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CarParkDisplay;
