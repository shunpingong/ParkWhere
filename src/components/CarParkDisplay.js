import React from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";

function CarParkDisplay({ carPark }) {
  const searchDirection = () => {
    // Implementation for searching directions
    console.log("Searching directions for", carPark.ppName);
  };

  return (
    <Paper elevation={5}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h5">{carPark.ppName}</Typography>
          <Typography>Start Time: {carPark.startTime}</Typography>
          <Typography>End Time: {carPark.endTime}</Typography>
          <Typography>Parking System: {carPark.parkingSystem}</Typography>
          <Typography>Park Capacity: {carPark.parkCapacity}</Typography>
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
