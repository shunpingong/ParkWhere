import React from "react";
import { Paper, Typography } from "@mui/material";

function CarParkDisplay({ carPark }) {
  return (
    <Paper elevation={5}>
      <Typography variant="h5">{carPark.ppName}</Typography>
      {/* <Typography>
        Weekday: {carPark.weekdayRate} for {carPark.weekdayMin}
      </Typography>
      <Typography>
        Saturday: {carPark.satdayRate} for {carPark.satdayMin}
      </Typography>
      <Typography>
        Sunday/PH: {carPark.sunPHRate} for {carPark.sunPHMin}
      </Typography> */}
      <Typography>Start Time: {carPark.startTime}</Typography>
      <Typography>End Time: {carPark.endTime}</Typography>
      <Typography>Parking System: {carPark.parkingSystem}</Typography>
      <Typography>Park Capacity: {carPark.parkCapacity}</Typography>
    </Paper>
  );
}

export default CarParkDisplay;
