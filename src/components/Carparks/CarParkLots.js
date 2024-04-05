import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { red, green, blue } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * A component for displaying car park lots about a car park.
 * @component
 * @returns {JSX.Element} CarParkLots component.
 */
const CarParkLots = ({ carPark }) => {
  const percentage_available = Math.round(
    (carPark.availableLots / carPark.totalLots) * 100
  );
  return (
    <>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          {percentage_available > 20 ? (
            <CheckCircleOutlineIcon sx={{ color: green[500], fontSize: 20 }} />
          ) : (
            <CancelIcon sx={{ color: red[500], fontSize: 20 }} />
          )}
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            fontSize={16}
            sx={{
              color: percentage_available < 20 ? "red" : "green",
            }}
          >
            <strong>Availability:</strong>{" "}
            {Math.round((carPark.availableLots / carPark.totalLots) * 100)}%
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <LocalParkingIcon sx={{ color: red[500], fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            fontSize={16}
            sx={{
              color: carPark.availableLots < 10 ? "red" : "black",
            }}
          >
            <strong>Lots Available:</strong> {carPark.availableLots} /{" "}
            {carPark.totalLots}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default CarParkLots;
