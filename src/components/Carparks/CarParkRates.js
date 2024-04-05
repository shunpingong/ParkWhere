import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MoneyIcon from "@mui/icons-material/Money";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { green, blue } from "@mui/material/colors";

/**
 * A component for displaying car park rates about a car park.
 * @component
 * @returns {JSX.Element} CarParkRates component.
 */
const CarParkRates = ({ carPark }) => {
  return (
    <div>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize={16}>
            <strong>Weekday/Sat:</strong> ${carPark.weekdayRate} /{" "}
            {carPark.weekdayMin}min
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize={16}>
            <strong>Sun/PH:</strong> {carPark.sunPHRate}
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
    </div>
  );
};

export default CarParkRates;
