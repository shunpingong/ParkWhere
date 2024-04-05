import React from "react";
import { Paper, Grid, IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { blue } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CarParkDetails from "./CarParkDetails";
import CarParkRates from "./CarParkRates";

/**
 * A component for displaying information about a car park in Favourite Page UI.
 * @component
 * @returns {JSX.Element} CarParkDisplay component.
 */
function CarParkDisplay({
  carPark,
  onGenerateDirectionsLink,
  onRemove,
  onRename,
}) {
  return (
    <Paper elevation={5} sx={{ p: 2, mb: 2, width: "100%" }}>
      <CarParkDetails carPark={carPark} />
      <CarParkRates carPark={carPark} />
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
    </Paper>
  );
}

export default CarParkDisplay;
